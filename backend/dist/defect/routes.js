"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectRoutes = void 0;
const express_1 = require("express");
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const controller_1 = require("./controller");
const defect_dto_1 = require("./defect.dto");
class DefectRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.DefectController();
        router.post("/", (0, validate_dto_middleware_1.validateDTO)(defect_dto_1.CreateDefectDTO), controller.createDefect.bind(controller));
        router.get("/", controller.getDefects.bind(controller));
        router.get("/:id", controller.getDefectById.bind(controller));
        router.put("/:id", (0, validate_dto_middleware_1.validateDTO)(defect_dto_1.UpdateDefectDTO), controller.updateDefect.bind(controller));
        router.delete("/:id", controller.deleteDefect.bind(controller));
        return router;
    }
}
exports.DefectRoutes = DefectRoutes;
