import express from "express";
import {
  getMeal,
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} from "../controllers/meal.controller";

const router = express.Router();

/*  Meals listing. */
router.route("/").get(getMeals).post(createMeal);
router.route("/:id").get(getMeal).put(updateMeal).delete(deleteMeal);

export default router;
