import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TestPlanController {
  // Crear un nuevo plan de pruebas
  createTestPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { name, description, projectId } = req.body;

    try {
      const newTestPlan = await prisma.testPlan.create({
        data: {
          name,
          description,
          project: { connect: { id: projectId } },
        },
      });
      res
        .status(201)
        .json({
          message: "Plan de pruebas creado exitosamente",
          testPlan: newTestPlan,
        });
    } catch (error) {
      next(error);
    }
  };

  // Obtener todos los planes de prueba
  getTestPlans = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const testPlans = await prisma.testPlan.findMany();
      res.json(testPlans);
    } catch (error) {
      next(error);
    }
  };

  // Obtener un plan de pruebas por ID
  getTestPlanById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const testPlan = await prisma.testPlan.findUnique({
        where: { id: Number(id) },
      });

      if (!testPlan) {
        res.status(404).json({ error: "Plan de pruebas no encontrado" });
        return;
      }

      res.json(testPlan);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar un plan de pruebas
  updateTestPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const updatedTestPlan = await prisma.testPlan.update({
        where: { id: Number(id) },
        data: { name, description },
      });

      res.json({
        message: "Plan de pruebas actualizado exitosamente",
        testPlan: updatedTestPlan,
      });
    } catch (error) {
      next(error);
    }
  };

  // Eliminar un plan de pruebas
  deleteTestPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      await prisma.testPlan.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
