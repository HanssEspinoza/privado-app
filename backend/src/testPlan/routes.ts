import { Router } from "express";
import { validateDTO } from "../middlewares/validate-dto.middleware";
import { TestPlanController } from "./controller";
import { CreateTestPlanDTO, UpdateTestPlanDTO } from "./testPlan.dto";

export class TestPlanRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TestPlanController();

    router.post(
      "/",
      validateDTO(CreateTestPlanDTO),
      controller.createTestPlan.bind(controller),
    );
    router.get("/", controller.getTestPlans.bind(controller));
    router.get("/:id", controller.getTestPlanById.bind(controller));
    router.put(
      "/:id",
      validateDTO(UpdateTestPlanDTO),
      controller.updateTestPlan.bind(controller),
    );
    router.delete("/:id", controller.deleteTestPlan.bind(controller));

    return router;
  }
}
