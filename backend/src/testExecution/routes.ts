import { Router } from "express";
import { validateDTO } from "../middlewares/validate-dto.middleware";
import { TestExecutionController } from "./controller";
import {
  CreateTestExecutionDTO,
  UpdateTestExecutionDTO,
} from "./testExecution.dto";

export class TestExecutionRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TestExecutionController();

    router.post(
      "/",
      validateDTO(CreateTestExecutionDTO),
      controller.createTestExecution.bind(controller),
    );
    router.get("/", controller.getTestExecutions.bind(controller));
    router.get("/:id", controller.getTestExecutionById.bind(controller));
    router.put(
      "/:id",
      validateDTO(UpdateTestExecutionDTO),
      controller.updateTestExecution.bind(controller),
    );
    router.delete("/:id", controller.deleteTestExecution.bind(controller));

    return router;
  }
}
