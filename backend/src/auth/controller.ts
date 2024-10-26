import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envs } from "../config";

const prisma = new PrismaClient();
const JWT_SECRET = envs.JWT_SECRET || "your_jwt_secret";

export class AuthController {
  registerUser = async (req: Request, res: Response) => {
    const { email, password, name, role } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(400).json({ error: "El usuario ya existe" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      res
        .status(201)
        .json({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Error en el registro del usuario" });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(400).json({ error: "Usuario o contraseña incorrectos" });

        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ error: "Usuario o contraseña incorrectos" });

        return;
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ error: "Error en el inicio de sesión" });
    }
  };
}
