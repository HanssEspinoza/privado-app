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
exports.TestPlanController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TestPlanController {
    constructor() {
        // Crear un nuevo plan de pruebas
        this.createTestPlan = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, projectId } = req.body;
            try {
                const newTestPlan = yield prisma.testPlan.create({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener todos los planes de prueba
        this.getTestPlans = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const testPlans = yield prisma.testPlan.findMany();
                res.json(testPlans);
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener un plan de pruebas por ID
        this.getTestPlanById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const testPlan = yield prisma.testPlan.findUnique({
                    where: { id: Number(id) },
                });
                if (!testPlan) {
                    res.status(404).json({ error: "Plan de pruebas no encontrado" });
                    return;
                }
                res.json(testPlan);
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar un plan de pruebas
        this.updateTestPlan = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description } = req.body;
            try {
                const updatedTestPlan = yield prisma.testPlan.update({
                    where: { id: Number(id) },
                    data: { name, description },
                });
                res.json({
                    message: "Plan de pruebas actualizado exitosamente",
                    testPlan: updatedTestPlan,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Eliminar un plan de pruebas
        this.deleteTestPlan = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.testPlan.delete({
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
exports.TestPlanController = TestPlanController;
