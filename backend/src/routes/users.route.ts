import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

/*  user listing. */
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
