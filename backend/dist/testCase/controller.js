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
exports.TestCaseController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TestCaseController {
    constructor() {
        // Crear un nuevo caso de prueba
        this.createTestCase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, expectedResult, testPlanId } = req.body;
            try {
                const newTestCase = yield prisma.testCase.create({
                    data: {
                        name,
                        description,
                        expectedResult,
                        testPlan: { connect: { id: testPlanId } },
                    },
                });
                res
                    .status(201)
                    .json({
                    message: "Caso de prueba creado exitosamente",
                    testCase: newTestCase,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener todos los casos de prueba
        this.getTestCases = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const testCases = yield prisma.testCase.findMany();
                res.json(testCases);
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener un caso de prueba por ID
        this.getTestCaseById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const testCase = yield prisma.testCase.findUnique({
                    where: { id: Number(id) },
                });
                if (!testCase) {
                    res.status(404).json({ error: "Caso de prueba no encontrado" });
                    return;
                }
                res.json(testCase);
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar un caso de prueba
        this.updateTestCase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description, expectedResult } = req.body;
            try {
                const updatedTestCase = yield prisma.testCase.update({
                    where: { id: Number(id) },
                    data: { name, description, expectedResult },
                });
                res.json({
                    message: "Caso de prueba actualizado exitosamente",
                    testCase: updatedTestCase,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Eliminar un caso de prueba
        this.deleteTestCase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.testCase.delete({
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
exports.TestCaseController = TestCaseController;
