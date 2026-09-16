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