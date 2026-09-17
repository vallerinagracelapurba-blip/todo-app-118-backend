import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Todo {
  id: number;
  user_id: number;
  task: string;
  is_completed: boolean;
}

export async function createTodo(
  userId: number,
  task: string
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    [userId, task]
  );

  return result.insertId;
}

export async function getTodosByUserId(
  userId: number
): Promise<Todo[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, user_id, task, is_completed FROM todos WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );

  return rows as Todo[];
}

// Get todo berdasarkan id dan userId
export async function getTodoById(
  id: number,
  userId: number
): Promise<Todo | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, user_id, task, is_completed FROM todos WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as Todo;
}

// Update task atau status is_completed
export async function updateTodo(
  id: number,
  task: string,
  isCompleted: boolean,
  userId: number
): Promise<number> {
  const [result]: any = await pool.query(
    "UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?",
    [task, isCompleted, id, userId]
  );

  return result.affectedRows;
}

// Hapus todo berdasarkan id dan userId
export async function deleteTodo(
  id: number,
  userId: number
): Promise<number> {
  const [result]: any = await pool.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return result.affectedRows;
}