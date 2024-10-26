import { Router } from "express";
import { validateDTO } from "../middlewares/validate-dto.middleware";
import { ProjectController } from "./controller";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.dto";

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProjectController();

    router.post("/", validateDTO(CreateProjectDTO), controller.createProject);
    router.get("/", controller.getProjects);
    router.get("/:id", controller.getProjectById);
    router.put("/:id", validateDTO(UpdateProjectDTO), controller.updateProject);
    router.delete("/:id", controller.deleteProject);

    return router;
  }
}
