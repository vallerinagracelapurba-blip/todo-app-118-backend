import { Request, Response } from "express";
import {
  createTodo,
  getTodosByUserId
} from "../models/todoModel.js";

export async function postTodo(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.userId;
    const { task } = req.body;

    const todoId = await createTodo(userId, task);

    return res.status(201).json({
      message: "Todo berhasil ditambahkan",
      todo: {
        id: todoId,
        user_id: userId,
        task,
        is_completed: false
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
}

export async function getTodos(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.userId;

    const todos = await getTodosByUserId(userId);

    return res.status(200).json({
      message: "Todo berhasil diambil",
      todos
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
}