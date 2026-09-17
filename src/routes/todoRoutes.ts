import { Router } from "express";
import {
  postTodo,
  getTodos,
  getTodoByIdHandler,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateUpdateTodo } from "../middlewares/validator.js";

const router = Router();

router.post("/", authMiddleware, postTodo);

router.get("/", authMiddleware, getTodos);

router.get(
  "/:id",
  authMiddleware,
  getTodoByIdHandler
);

router.put(
  "/:id",
  authMiddleware,
  validateUpdateTodo,
  updateTodo
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTodo
);

export default router;