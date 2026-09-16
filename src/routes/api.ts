import { Router } from "express";

import {
  register,
  login
} from "../controllers/authController.js";

import {
  postTodo,
  getTodos
} from "../controllers/todoController.js";

import {
  validateRegister,
  validateLogin,
  validateTodo
} from "../middlewares/validator.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/auth/register",
  validateRegister,
  register
);

router.post(
  "/auth/login",
  validateLogin,
  login
);

router.post(
  "/todos",
  authMiddleware,
  validateTodo,
  postTodo
);

router.get(
  "/todos",
  authMiddleware,
  getTodos
);

export default router;