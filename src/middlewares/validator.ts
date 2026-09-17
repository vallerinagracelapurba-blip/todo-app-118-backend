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

// Validasi untuk update todo — task dan is_completed boleh dikirim bersamaan
export const validateUpdateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { task, is_completed } = req.body;

  // Minimal salah satu harus dikirim
  if (task === undefined && is_completed === undefined) {
    res.status(400).json({
      success: false,
      message: "Isi minimal task atau is_completed!"
    });
    return;
  }

  // Jika task dikirim, harus berupa string
  if (task !== undefined && typeof task !== "string") {
    res.status(400).json({
      success: false,
      message: "Task harus berupa string!"
    });
    return;
  }

  // Jika is_completed dikirim, harus berupa boolean
  if (
    is_completed !== undefined &&
    typeof is_completed !== "boolean"
  ) {
    res.status(400).json({
      success: false,
      message: "is_completed harus berupa true atau false!"
    });
    return;
  }

  next();
};