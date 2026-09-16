import { Request, Response, NextFunction } from "express";

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, dan password wajib diisi"
    });
  }

  next();
}

export function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email dan password wajib diisi"
    });
  }

  next();
}

export function validateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      message: "Task wajib diisi"
    });
  }

  next();
}