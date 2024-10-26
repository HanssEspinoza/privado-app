"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const controller_1 = require("./controller");
const project_dto_1 = require("./project.dto");
class ProjectRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ProjectController();
        router.post("/", (0, validate_dto_middleware_1.validateDTO)(project_dto_1.CreateProjectDTO), controller.createProject);
        router.get("/", controller.getProjects);
        router.get("/:id", controller.getProjectById);
        router.put("/:id", (0, validate_dto_middleware_1.validateDTO)(project_dto_1.UpdateProjectDTO), controller.updateProject);
        router.delete("/:id", controller.deleteProject);
        return router;
    }
}
exports.ProjectRoutes = ProjectRoutes;
