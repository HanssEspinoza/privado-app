"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProjectController {
    constructor() {
        this.createProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, ownerId } = req.body;
            try {
                const newProject = yield prisma.project.create({
                    data: { name, description, ownerId },
                });
                res
                    .status(201)
                    .json({ message: "Proyecto creado exitosamente", project: newProject });
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener todos los proyectos
        this.getProjects = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield prisma.project.findMany();
                res.json(projects);
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener un proyecto por ID
        this.getProjectById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const project = yield prisma.project.findUnique({
                    where: { id: Number(id) },
                });
                if (!project) {
                    res.status(404).json({ error: "Proyecto no encontrado" });
                    return;
                }
                res.json(project);
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar un proyecto
        this.updateProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description } = req.body;
            try {
                const updatedProject = yield prisma.project.update({
                    where: { id: Number(id) },
                    data: { name, description },
                });
                res.json({
                    message: "Proyecto actualizado exitosamente",
                    project: updatedProject,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Eliminar un proyecto
        this.deleteProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.project.delete({
                    where: { id: Number(id) },
                });
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProjectController = ProjectController;
