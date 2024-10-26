import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TestCaseController {
  // Crear un nuevo caso de prueba
  createTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { name, description, expectedResult, testPlanId } = req.body;

    try {
      const newTestCase = await prisma.testCase.create({
        data: {
          name,
          description,
          expectedResult,
          testPlan: { connect: { id: testPlanId } },
        },
      });
      res.status(201).json({
        message: "Caso de prueba creado exitosamente",
        testCase: newTestCase,
      });
    } catch (error) {
      next(error);
    }
  };

  // Obtener todos los casos de prueba
  getTestCases = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const testCases = await prisma.testCase.findMany();
      res.json(testCases);
    } catch (error) {
      next(error);
    }
  };

  // Obtener un caso de prueba por ID
  getTestCaseById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const testCase = await prisma.testCase.findUnique({
        where: { id: Number(id) },
      });

      if (!testCase) {
        res.status(404).json({ error: "Caso de prueba no encontrado" });
        return;
      }

      res.json(testCase);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar un caso de prueba
  updateTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    const { name, description, expectedResult } = req.body;

    try {
      const updatedTestCase = await prisma.testCase.update({
        where: { id: Number(id) },
        data: { name, description, expectedResult },
      });

      res.json({
        message: "Caso de prueba actualizado exitosamente",
        testCase: updatedTestCase,
      });
    } catch (error) {
      next(error);
    }
  };

  // Eliminar un caso de prueba
  deleteTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      await prisma.testCase.delete({
        where: { id: Number(id) },
      });

      res
        .status(200)
        .json({ message: "Caso de prueba eliminado exitosamente" });
    } catch (error) {
      next(error);
    }
  };
}
