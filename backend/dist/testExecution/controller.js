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
exports.TestExecutionController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TestExecutionController {
    constructor() {
        // Crear una nueva ejecución de prueba
        this.createTestExecution = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { testCaseId, executedBy, result, evidence } = req.body;
            try {
                const newTestExecution = yield prisma.testExecution.create({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener todas las ejecuciones de prueba
        this.getTestExecutions = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const testExecutions = yield prisma.testExecution.findMany();
                res.json(testExecutions);
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener una ejecución de prueba por ID
        this.getTestExecutionById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const testExecution = yield prisma.testExecution.findUnique({
                    where: { id: Number(id) },
                });
                if (!testExecution) {
                    res.status(404).json({ error: "Ejecución de prueba no encontrada" });
                    return;
                }
                res.json(testExecution);
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar una ejecución de prueba
        this.updateTestExecution = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { result, evidence } = req.body;
            try {
                const updatedTestExecution = yield prisma.testExecution.update({
                    where: { id: Number(id) },
                    data: { result, evidence },
                });
                res.json({
                    message: "Ejecución de prueba actualizada exitosamente",
                    testExecution: updatedTestExecution,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Eliminar una ejecución de prueba
        this.deleteTestExecution = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.testExecution.delete({
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
exports.TestExecutionController = TestExecutionController;
