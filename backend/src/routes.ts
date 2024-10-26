import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProjectRoutes } from "./project/routes";
import { TestPlanRoutes } from "./testPlan/routes";
import { TestCaseRoutes } from "./testCase/routes";
import { TestExecutionRoutes } from "./testExecution/routes";
import { DefectRoutes } from "./defect/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/projects", ProjectRoutes.routes);
    router.use("/api/test-plans", TestPlanRoutes.routes);
    router.use("/api/test-cases", TestCaseRoutes.routes);
    router.use("/api/test-executions", TestExecutionRoutes.routes);
    router.use("/api/defects", DefectRoutes.routes);

    return router;
  }
}
