import { disconnectClient, prismaClient } from "../config/db";
import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.middleware";

// @desc    Get a meal
// @route   GET /api/meals/ id
const getMeal = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const meal = await prismaClient.meal.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (meal) {
      return res.status(200).json(meal);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
  } finally {
    await disconnectClient();
  }
});
// @desc    Get a meal
// @route   GET /api/meals/ id
const getMeals = asyncErrorHandler(async (req, res, next) => {
  try {
    const allMeals = await prismaClient.meal.findMany();
    if (allMeals) {
      return res.status(200).json(allMeals);
    }
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the error handling middleware
  } finally {
    await disconnectClient();
  }
});

// @desc    create a meal
// @route   POST /api/meals
const createMeal = asyncErrorHandler(async (req, res, next) => {
  const { date, breakfast, lunch, dinner, snacks, notes, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Missing user!" });
  }
  try {
    const newUser = await prismaClient.meal.create({
      data: {
        date,
        breakfast,
        lunch,
        dinner,
        snacks,
        notes,
        userId: userId,
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

// @desc    update meal details
// @route   PUT /api/meals/id

const updateMeal = asyncErrorHandler(async (req, res, next) => {
  const { breakfast, date, dinner, lunch, notes, snacks, userId } = req.body;
  const { id } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "Missing user!" });
  }
  try {
    const newUser = await prismaClient.meal.update({
      where: {
        id: parseInt(id),
      },
      data: {
        breakfast,
        date,
        dinner,
        lunch,
        notes,
        snacks,
        userId,
        updatedAt: new Date(),
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
// @route   DELETE /api/meals/ id

const deleteMeal = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing User" });
  }
  try {
    const deletedUser = await prismaClient.meal.delete({
      where: {
        id: parseInt(id),
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

export { getMeal, getMeals, createMeal, updateMeal, deleteMeal };
