import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as User;
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    [username]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as User;
}

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return result.insertId;
}