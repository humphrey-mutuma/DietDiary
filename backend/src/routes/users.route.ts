import express from "express";
import {
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

/*  user listing. */
router.route("/").get(protect, getUsers);
router
  .route("/:id")
  .get(protect, getUserDetails)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
