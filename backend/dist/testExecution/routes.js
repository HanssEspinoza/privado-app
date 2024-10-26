"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestExecutionRoutes = void 0;
const express_1 = require("express");
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const controller_1 = require("./controller");
const testExecution_dto_1 = require("./testExecution.dto");
class TestExecutionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.TestExecutionController();
        router.post("/", (0, validate_dto_middleware_1.validateDTO)(testExecution_dto_1.CreateTestExecutionDTO), controller.createTestExecution.bind(controller));
        router.get("/", controller.getTestExecutions.bind(controller));
        router.get("/:id", controller.getTestExecutionById.bind(controller));
        router.put("/:id", (0, validate_dto_middleware_1.validateDTO)(testExecution_dto_1.UpdateTestExecutionDTO), controller.updateTestExecution.bind(controller));
        router.delete("/:id", controller.deleteTestExecution.bind(controller));
        return router;
    }
}
exports.TestExecutionRoutes = TestExecutionRoutes;
