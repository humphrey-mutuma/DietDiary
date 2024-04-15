import { NextFunction, Request, Response } from "express";
import { disconnectClient, prismaClient } from "../config/db";
import jwt from "jsonwebtoken";
import { asyncErrorHandler } from "./asyncErrorHandler.middleware";
import { DecodedToken } from "../utils/types";

interface ExtendedRequest extends Request {
  user?: {
    id: string;
    email: string;
    // Other user properties
  } | null;
}
 

const protect = asyncErrorHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }
      // ********* check if user has an active session here

      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as DecodedToken;

        // Get user from the token
        req.user = await prismaClient.user.findUnique({
          where: {
            id: decoded.id,
          },
          select: {
            id: true,
            email: true,
          },
        });
        

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      } finally {
        await disconnectClient();
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
