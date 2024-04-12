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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const db_1 = require("../config/db");
const asyncErrorHandler_middleware_1 = require("../middlewares/asyncErrorHandler.middleware");
// @desc    Get a user
// @route   GET /api/users/ id
const getUser = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const { startDate, endDate } = req.query;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
        const user = yield db_1.prismaClient.user.findUnique({
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
    }
    catch (error) {
        console.error(error);
        next(error); // Forward the error to the error handling middleware
    }
    finally {
        yield (0, db_1.disconnectClient)();
    }
}));
exports.getUser = getUser;
// @desc    Get a user
// @route   GET /api/users/ id
const getUsers = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield db_1.prismaClient.user.findMany();
        if (allUsers) {
            return res.status(200).json(allUsers);
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
exports.getUsers = getUsers;
// @desc    create a user
// @route   POST /api/users
const createUser = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    if (!(email === null || email === void 0 ? void 0 : email.trim()) || !(name === null || name === void 0 ? void 0 : name.trim())) {
        return res.status(400).json({ message: "Missing email or name!" });
    }
    try {
        const newUser = yield db_1.prismaClient.user.create({
            data: {
                email,
                name,
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
exports.createUser = createUser;
// @desc    update user details
// @route   PUT /api/users/id
const updateUser = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    const { id } = req.params;
    if (!(email === null || email === void 0 ? void 0 : email.trim()) || !(name === null || name === void 0 ? void 0 : name.trim())) {
        return res.status(400).json({ message: "Missing email or name!" });
    }
    try {
        const newUser = yield db_1.prismaClient.user.update({
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
exports.updateUser = updateUser;
// @desc    delete a user
// @route   DELETE /api/users/ id
const deleteUser = (0, asyncErrorHandler_middleware_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing User" });
    }
    try {
        const deletedUser = yield db_1.prismaClient.user.delete({
            where: {
                id: id,
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
exports.deleteUser = deleteUser;
