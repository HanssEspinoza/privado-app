"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseRoutes = void 0;
const express_1 = require("express");
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const controller_1 = require("./controller");
const testCase_dto_1 = require("./testCase.dto");
class TestCaseRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.TestCaseController();
        router.post("/", (0, validate_dto_middleware_1.validateDTO)(testCase_dto_1.CreateTestCaseDTO), controller.createTestCase.bind(controller));
        router.get("/", controller.getTestCases.bind(controller));
        router.get("/:id", controller.getTestCaseById.bind(controller));
        router.put("/:id", (0, validate_dto_middleware_1.validateDTO)(testCase_dto_1.UpdateTestCaseDTO), controller.updateTestCase.bind(controller));
        router.delete("/:id", controller.deleteTestCase.bind(controller));
        return router;
    }
}
exports.TestCaseRoutes = TestCaseRoutes;
