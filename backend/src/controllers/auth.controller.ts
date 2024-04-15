import { disconnectClient, prismaClient } from "../config/db";
import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.middleware";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CookieOptions, Request } from "express";
import { DecodedToken } from "../utils/types";

interface ExtendedRequest extends Request {
  user?: {
    id: string;
    email: string;
    // Other user properties
  };
}
// Set cookies with tokens
const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production" ? true : false, // Set to true in production if using HTTPS
  expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes in milliseconds
  maxAge: 15 * 60, // 15 minutes in seconds
};

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production" ? true : false, // Set to true in production if using HTTPS
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

// @desc    create a user
// @route   POST /api/users
const registerUserHandler = asyncErrorHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Email or password not found!" });
  }

  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET || !process.env.JWT_SECRET_REFRESH) {
    return res.status(400).json({
      message:
        "JWT_SECRET or JWT_SECRET_REFRESH is not defined in the env variables.",
    });
  }
  // check if user already exists
  const userExists = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists! Please Login" });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    if (newUser) {
      // Generate access token
      const {
        accessToken,
        refreshToken,
        accessTokenExpiration,
        refreshTokenExpiration,
      } = await generateTokens(newUser);

      // Save refresh token to database (make sure to hash it)
      await prismaClient.account.create({
        data: {
          userId: newUser.id,
          type: "oauth",
          provider: "credentials",
          providerAccountId: newUser.email,
          refresh_token: await bcrypt.hash(refreshToken, 10),
          access_token: await bcrypt.hash(accessToken, 10),
          expires_at: accessTokenExpiration, // 15 minutes from now
          token_type: "Bearer",
          scope: "", // Set appropriate scope if needed
          id_token: "", // Set appropriate id token if needed
          session_state: "", // Set appropriate session state if needed
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        message: "User Successfully created!",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
    return res.status(400).json(error);
  } finally {
    await disconnectClient();
  }
});
// @desc    Get a user
// @route   GET /api/users/ id
const loginUserHandler = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const { id, email } = req.user;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Email or password not found!" });
  }

  try {
    // get user email by email
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        name: true,
        email: true,
      },
    });

    // check used password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate access token
      const {
        accessToken,
        refreshToken,
        accessTokenExpiration,
        refreshTokenExpiration,
      } = await generateTokens(user);

      res.cookie("access_token", accessToken, accessTokenCookieOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
      res.cookie("logged_in", true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      // Save new tokens to database (make sure to hash it)
      await prismaClient.account.update({
        where: {
          provider_providerAccountId: {
            provider: "credentials",
            providerAccountId: user.email,
          },
        },
        data: {
          // userId: user.id,
          // type: "oauth",
          // provider: "credentials",
          // providerAccountId: user.email,
          refresh_token: await bcrypt.hash(refreshToken, 10),
          access_token: await bcrypt.hash(accessToken, 10),
          expires_at: accessTokenExpiration, // time from now
          // token_type: "Bearer",
          // scope: "", // Set appropriate scope if needed
          // id_token: "", // Set appropriate id token if needed
          // session_state: "", // Set appropriate session state if needed
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
  } finally {
    await disconnectClient();
  }
});

// @desc    Get a user
// @route   GET /api/users/ id
const refreshAccessTokenHandler = asyncErrorHandler(async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;
   
  if (!refresh_token?.trim() || !process.env.JWT_SECRET_REFRESH) {
    return res
      .status(400)
      .json({ message: "Refresh token or secret Not Found!" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH
    ) as DecodedToken;

    // Sign new access token
    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = await generateTokens(decoded);

     // Save new access token to database (make sure to hash it)
    await prismaClient.account.update({
      where: {
        provider_providerAccountId: {
          provider: "credentials",
          providerAccountId: decoded.email,
        },
      },
      data: {
        // userId: user.id,
        // type: "oauth",
        // provider: "credentials",
        // providerAccountId: user.email,
        // refresh_token: await bcrypt.hash(refreshToken, 10),
        access_token: await bcrypt.hash(accessToken, 10),
        expires_at: accessTokenExpiration, // time from now
        // token_type: "Bearer",
        // scope: "", // Set appropriate scope if needed
        // id_token: "", // Set appropriate id token if needed
        // session_state: "", // Set appropriate session state if needed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    // 4. Add Cookies and return res
    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.json({
      accessToken,
    });
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
  } finally {
    await disconnectClient();
  }
});

// @desc    log user out 
// @route   GET /api/auth/logout
const loginUserOutHandler = asyncErrorHandler(
  async (req: ExtendedRequest, res, next) => {
    // get user from middleware req
    const user = req.user;
    if (!user) {
      return res.status(200).json({ message: "User credentials Not found!" });
    }

    try {
      const user_account = await prismaClient.account.update({
        where: {
          provider_providerAccountId: {
            provider: "credentials",
            providerAccountId: user.email,
          },
        },
        data: {
          access_token: null,
          refresh_token: null,
          expires_at: null,
          updatedAt: new Date(),
        },
      });
      if (user_account) {
        return res
          .status(200)
          .json({ message: "Successfully logged Out!", user_account });
      }
    } catch (error) {
      console.error(error);
      next(error); // Forward the error to the error handling middleware
    } finally {
      await disconnectClient();
    }
  }
);

export {
  loginUserHandler,
  registerUserHandler,
  loginUserOutHandler,
  refreshAccessTokenHandler,
};

// Generate JWT
const generateTokens = (user: { id: string; email: string }) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  const accessTokenExpiration = currentTimestamp + 15 * 60; // 15 minutes from now
  const refreshTokenExpiration = currentTimestamp + 7 * 24 * 60 * 60; // 7 days from now

  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET || !process.env.JWT_SECRET_REFRESH) {
    throw new Error(
      "JWT_SECRET or JWT_SECRET_REFRESH is not defined in the environment variables."
    );
  }

  // Generate access token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, timestamp: currentTimestamp },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, timestamp: currentTimestamp },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: "30d" }
  );

  return {
    accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
  };
};
