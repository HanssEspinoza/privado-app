import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  // Obtener todos los usuarios
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  // Obtener usuarios por rol
  async getUsersByRole(req: Request, res: Response, next: NextFunction) {
    const { role } = req.query;

    try {
      const roleValue = (role as string).toUpperCase();

      if (!Object.values(Role).includes(roleValue as Role)) {
        res.status(400).json({ error: "Rol inválido" });
        return;
      }

      const users = await prisma.user.findMany({
        where: {
          role: roleValue as Role,
        },
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  // Crear un nuevo usuario
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, role } = req.body;

    try {
      const roleValue = (role as string).toUpperCase();

      if (!Object.values(Role).includes(roleValue as Role)) {
        res.status(400).json({ error: "Rol inválido" });
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role: roleValue as Role, // Aseguramos que `role` sea de tipo `Role`
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar un usuario existente
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
      const roleValue = (role as string).toUpperCase();

      if (!Object.values(Role).includes(roleValue as Role)) {
        res.status(400).json({ error: "Rol inválido" });
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, role: roleValue as Role },
      });
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  // Eliminar un usuario
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
