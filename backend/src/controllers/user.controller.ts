import { disconnectClient, prismaClient } from "../config/db";
import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.middleware";

// @desc    Get a user
// @route   GET /api/users/ id
const getUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  // const { startDate, endDate } = req.query;
  const startDate: string = req.query.startDate as string;
  const endDate: string = req.query.endDate as string;

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        plans: {
          where: {
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
          select: {
            id: true,
            breakfast: true,
            date: true,
            dinner: true,
            lunch: true,
            notes: true,
            snacks: true,
            createdAt: true,
          },
        },
      },
    });
    if (user) {
      return res.status(200).json(user);
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
const getUsers = asyncErrorHandler(async (req, res, next) => {
  try {
    const allUsers = await prismaClient.user.findMany();
    if (allUsers) {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
  } finally {
    await disconnectClient();
  }
});

// @desc    create a user
// @route   POST /api/users
const createUser = asyncErrorHandler(async (req, res, next) => {
  const { email, name } = req.body;
  if (!email?.trim() || !name?.trim()) {
    return res.status(400).json({ message: "Missing email or name!" });
  }
  try {
    const newUser = await prismaClient.user.create({
      data: {
        email,
        name,
      },
    });
    if (newUser) {
      return res.status(200).json(newUser);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
    return res.status(400).json(error);
  } finally {
    await disconnectClient();
  }
});

// @desc    update user details
// @route   PUT /api/users/id

const updateUser = asyncErrorHandler(async (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.params;
  if (!email?.trim() || !name?.trim()) {
    return res.status(400).json({ message: "Missing email or name!" });
  }
  try {
    const newUser = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        name,
      },
    });
    if (newUser) {
      return res.status(200).json(newUser);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
    return res.status(400).json(error);
  } finally {
    await disconnectClient();
  }
});

// @desc    delete a user
// @route   DELETE /api/users/ id

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing User" });
  }
  try {
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: id,
      },
    });
    if (deletedUser) {
      return res.status(200).json(deletedUser);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
    return res.status(400).json(error);
  } finally {
    await disconnectClient();
  }
});

export { getUser, getUsers, createUser, updateUser, deleteUser };
