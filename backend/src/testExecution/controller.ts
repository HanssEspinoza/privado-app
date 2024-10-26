import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TestExecutionController {
  // Crear una nueva ejecución de prueba
  createTestExecution = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { testCaseId, executedBy, result, evidence } = req.body;

    try {
      const newTestExecution = await prisma.testExecution.create({
        data: {
          testCase: { connect: { id: testCaseId } },
          executedBy,
          result,
          evidence,
        },
      });
      res
        .status(201)
        .json({
          message: "Ejecución de prueba creada exitosamente",
          testExecution: newTestExecution,
        });
    } catch (error) {
      next(error);
    }
  };

  // Obtener todas las ejecuciones de prueba
  getTestExecutions = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const testExecutions = await prisma.testExecution.findMany();
      res.json(testExecutions);
    } catch (error) {
      next(error);
    }
  };

  // Obtener una ejecución de prueba por ID
  getTestExecutionById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const testExecution = await prisma.testExecution.findUnique({
        where: { id: Number(id) },
      });

      if (!testExecution) {
        res.status(404).json({ error: "Ejecución de prueba no encontrada" });
        return;
      }

      res.json(testExecution);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar una ejecución de prueba
  updateTestExecution = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    const { result, evidence } = req.body;

    try {
      const updatedTestExecution = await prisma.testExecution.update({
        where: { id: Number(id) },
        data: { result, evidence },
      });

      res.json({
        message: "Ejecución de prueba actualizada exitosamente",
        testExecution: updatedTestExecution,
      });
    } catch (error) {
      next(error);
    }
  };

  // Eliminar una ejecución de prueba
  deleteTestExecution = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      await prisma.testExecution.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
