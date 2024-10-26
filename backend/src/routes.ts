import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProjectRoutes } from "./project/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/project", ProjectRoutes.routes);

    return router;
  }
}
