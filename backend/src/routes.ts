import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProjectRoutes } from "./project/routes";
import { TestPlanRoutes } from "./testPlan/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/project", ProjectRoutes.routes);
    router.use("/api/test-plan", TestPlanRoutes.routes);

    return router;
  }
}
