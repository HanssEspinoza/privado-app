import { Router } from "express";
import { validateDTO } from "../middlewares/validate-dto.middleware";
import { DefectController } from "./controller";
import { CreateDefectDTO, UpdateDefectDTO } from "./defect.dto";

export class DefectRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DefectController();

    router.post(
      "/",
      validateDTO(CreateDefectDTO),
      controller.createDefect.bind(controller),
    );
    router.get("/", controller.getDefects.bind(controller));
    router.get("/:id", controller.getDefectById.bind(controller));
    router.put(
      "/:id",
      validateDTO(UpdateDefectDTO),
      controller.updateDefect.bind(controller),
    );
    router.delete("/:id", controller.deleteDefect.bind(controller));

    return router;
  }
}
