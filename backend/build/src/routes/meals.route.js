"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meal_controller_1 = require("../controllers/meal.controller");
const router = express_1.default.Router();
/*  Meals listing. */
router.route("/").get(meal_controller_1.getMeals).post(meal_controller_1.createMeal);
router.route("/:id").get(meal_controller_1.getMeal).put(meal_controller_1.updateMeal).delete(meal_controller_1.deleteMeal);
exports.default = router;
