"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPlanRoutes = void 0;
const express_1 = require("express");
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const controller_1 = require("./controller");
const testPlan_dto_1 = require("./testPlan.dto");
class TestPlanRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.TestPlanController();
        router.post("/", (0, validate_dto_middleware_1.validateDTO)(testPlan_dto_1.CreateTestPlanDTO), controller.createTestPlan.bind(controller));
        router.get("/", controller.getTestPlans.bind(controller));
        router.get("/:id", controller.getTestPlanById.bind(controller));
        router.put("/:id", (0, validate_dto_middleware_1.validateDTO)(testPlan_dto_1.UpdateTestPlanDTO), controller.updateTestPlan.bind(controller));
        router.delete("/:id", controller.deleteTestPlan.bind(controller));
        return router;
    }
}
exports.TestPlanRoutes = TestPlanRoutes;
