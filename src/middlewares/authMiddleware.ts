import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header tidak ditemukan"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token tidak ditemukan"
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET belum dikonfigurasi"
      });
    }

    const decoded = jwt.verify(token, secret) as {
      userId: number;
    };

    res.locals.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid atau sudah expired"
    });
  }
}