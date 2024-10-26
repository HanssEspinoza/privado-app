import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectController {
  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { name, description, ownerId } = req.body;

    try {
      const newProject = await prisma.project.create({
        data: { name, description, ownerId },
      });
      res
        .status(201)
        .json({ message: "Proyecto creado exitosamente", project: newProject });
    } catch (error) {
      next(error);
    }
  };

  // Obtener todos los proyectos
  getProjects = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const projects = await prisma.project.findMany();
      res.json(projects);
    } catch (error) {
      next(error);
    }
  };

  // Obtener un proyecto por ID
  getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const project = await prisma.project.findUnique({
        where: { id: Number(id) },
      });

      if (!project) {
        res.status(404).json({ error: "Proyecto no encontrado" });
        return;
      }

      res.json(project);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar un proyecto
  updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const updatedProject = await prisma.project.update({
        where: { id: Number(id) },
        data: { name, description },
      });

      res.json({
        message: "Proyecto actualizado exitosamente",
        project: updatedProject,
      });
    } catch (error) {
      next(error);
    }
  };

  // Eliminar un proyecto
  deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      await prisma.project.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
      next(error);
    }
  };
}
