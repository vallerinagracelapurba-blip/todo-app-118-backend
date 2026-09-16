import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
  findUserByUsername
} from "../models/userModel.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        message: "Email sudah terdaftar"
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        message: "Username sudah digunakan"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser(
      username,
      email,
      hashedPassword
    );

    return res.status(201).json({
      message: "Register berhasil",
      user: {
        id: userId,
        username,
        email
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email atau password salah"
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET belum dikonfigurasi"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      secret,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      message: "Login berhasil",
      token
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan server"
    });
  }
}