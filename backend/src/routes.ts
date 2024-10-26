import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProjectRoutes } from "./project/routes";
import { TestPlanRoutes } from "./testPlan/routes";
import { TestCaseRoutes } from "./testCase/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/project", ProjectRoutes.routes);
    router.use("/api/test-plan", TestPlanRoutes.routes);
    router.use("/api/test-case", TestCaseRoutes.routes);

    return router;
  }
}
