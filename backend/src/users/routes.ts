import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController();

    router.get("/", controller.getAllUsers);
    router.get("/role", controller.getUsersByRole);
    router.post("/", controller.createUser);
    router.put("/:id", controller.updateUser);
    router.delete("/:id", controller.deleteUser);

    return router;
  }
}
