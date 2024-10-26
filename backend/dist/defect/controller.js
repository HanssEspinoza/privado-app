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
exports.DefectController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DefectController {
    constructor() {
        // Crear un nuevo defecto
        this.createDefect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, status, reportedBy, assignedTo, testCaseId } = req.body;
            try {
                const newDefect = yield prisma.defect.create({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener todos los defectos
        this.getDefects = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const defects = yield prisma.defect.findMany();
                res.json(defects);
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener un defecto por ID
        this.getDefectById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const defect = yield prisma.defect.findUnique({
                    where: { id: Number(id) },
                });
                if (!defect) {
                    res.status(404).json({ error: "Defecto no encontrado" });
                    return;
                }
                res.json(defect);
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar un defecto
        this.updateDefect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description, status, assignedTo } = req.body;
            try {
                const updatedDefect = yield prisma.defect.update({
                    where: { id: Number(id) },
                    data: { title, description, status, assignedTo },
                });
                res.json({
                    message: "Defecto actualizado exitosamente",
                    defect: updatedDefect,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Eliminar un defecto
        this.deleteDefect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.defect.delete({
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
exports.DefectController = DefectController;
