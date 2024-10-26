import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DefectController {
  // Crear un nuevo defecto
  createDefect = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { title, description, status, reportedBy, assignedTo, testCaseId } =
      req.body;

    try {
      const newDefect = await prisma.defect.create({
        data: {
          title,
          description,
          status,
          reportedBy,
          assignedTo,
          testCase: testCaseId ? { connect: { id: testCaseId } } : undefined,
        },
      });
      res
        .status(201)
        .json({ message: "Defecto creado exitosamente", defect: newDefect });
    } catch (error) {
      next(error);
    }
  };

  // Obtener todos los defectos
  getDefects = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const defects = await prisma.defect.findMany();
      res.json(defects);
    } catch (error) {
      next(error);
    }
  };

  // Obtener un defecto por ID
  getDefectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const defect = await prisma.defect.findUnique({
        where: { id: Number(id) },
      });

      if (!defect) {
        res.status(404).json({ error: "Defecto no encontrado" });
        return;
      }

      res.json(defect);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar un defecto
  updateDefect = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;

    try {
      const updatedDefect = await prisma.defect.update({
        where: { id: Number(id) },
        data: { title, description, status, assignedTo },
      });

      res.json({
        message: "Defecto actualizado exitosamente",
        defect: updatedDefect,
      });
    } catch (error) {
      next(error);
    }
  };

  // Eliminar un defecto
  deleteDefect = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      await prisma.defect.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
