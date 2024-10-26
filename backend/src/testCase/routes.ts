import { Router } from "express";
import { validateDTO } from "../middlewares/validate-dto.middleware";
import { TestCaseController } from "./controller";
import { CreateTestCaseDTO, UpdateTestCaseDTO } from "./testCase.dto";

export class TestCaseRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TestCaseController();

    router.post(
      "/",
      validateDTO(CreateTestCaseDTO),
      controller.createTestCase.bind(controller),
    );
    router.get("/", controller.getTestCases.bind(controller));
    router.get("/:id", controller.getTestCaseById.bind(controller));
    router.put(
      "/:id",
      validateDTO(UpdateTestCaseDTO),
      controller.updateTestCase.bind(controller),
    );
    router.delete("/:id", controller.deleteTestCase.bind(controller));

    return router;
  }
}
