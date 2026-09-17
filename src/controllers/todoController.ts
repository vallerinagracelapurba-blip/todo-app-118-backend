import { Request, Response } from "express";

import {
  createTodo,
  getTodosByUserId,
  getTodoById,
  updateTodo as updateTodoModel,
  deleteTodo as deleteTodoModel
} from "../models/todoModel.js";

// POST Todo
export async function postTodo(
  req: Request,
  res: Response
) {
  try {
    const { task } = req.body;
    const userId = res.locals.userId;

    if (!task) {
      return res.status(400).json({
        message: "Task wajib diisi"
      });
    }

    const todoId = await createTodo(userId, task);

    return res.status(201).json({
      message: "Todo berhasil dibuat",
      todoId
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal membuat todo"
    });
  }
}

// GET semua Todo
export async function getTodos(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.userId;

    const todos = await getTodosByUserId(userId);

    return res.status(200).json({
      message: "Berhasil mengambil data todo",
      data: todos
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal mengambil data todo"
    });
  }
}

// GET Todo berdasarkan ID
export async function getTodoByIdHandler(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const todo = await getTodoById(id, userId);

    if (!todo) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan!"
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil tugas",
      data: todo
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal mengambil tugas."
    });
  }
}

// Update Todo
export async function updateTodo(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const { task, is_completed } = req.body;
    const userId = res.locals.userId;

    const affectedRows = await updateTodoModel(
      id,
      task,
      is_completed,
      userId
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan!"
      });
    }

    return res.status(200).json({
      message: "Tugas berhasil diperbarui!"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal memperbarui tugas."
    });
  }
}

// Delete Todo
export async function deleteTodo(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const affectedRows = await deleteTodoModel(
      id,
      userId
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan!"
      });
    }

    return res.status(200).json({
      message: "Tugas berhasil dihapus!"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Gagal menghapus tugas."
    });
  }
}