"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeal = exports.updateMeal = exports.createMeal = exports.getMeals = exports.getMeal = void 0;
const db_1 = require("../config/db");
const asyncErrorHandler_middleware_1 = require("../middlewares/asyncErrorHandler.middleware");
// @desc    Get a meal
// @route   GET /api/meals/ id
const getMeal = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const meal = yield db_1.prismaClient.meal.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (meal) {
            return res.status(200).json(meal);
        }
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.getMeal = getMeal;
// @desc    Get a meal
// @route   GET /api/meals/ id
const getMeals = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMeals = yield db_1.prismaClient.meal.findMany();
        if (allMeals) {
            return res.status(200).json(allMeals);
        }
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.getMeals = getMeals;
// @desc    create a meal
// @route   POST /api/meals
const createMeal = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, breakfast, lunch, dinner, snacks, notes, userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "Missing user!" });
    }
    try {
        const newUser = yield db_1.prismaClient.meal.create({
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
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
        return res.status(400).json(error);
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.createMeal = createMeal;
// @desc    update meal details
// @route   PUT /api/meals/id
const updateMeal = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { breakfast, date, dinner, lunch, notes, snacks, userId } = req.body;
    const { id } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "Missing user!" });
    }
    try {
        const newUser = yield db_1.prismaClient.meal.update({
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
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
        return res.status(400).json(error);
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.updateMeal = updateMeal;
// @desc    delete a user
// @route   DELETE /api/meals/ id
const deleteMeal = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing User" });
    }
    try {
        const deletedUser = yield db_1.prismaClient.meal.delete({
            where: {
                id: parseInt(id),
            },
        });
        if (deletedUser) {
            return res.status(200).json(deletedUser);
        }
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
        return res.status(400).json(error);
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.deleteMeal = deleteMeal;
