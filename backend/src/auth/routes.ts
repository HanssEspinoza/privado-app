import { Router } from "express";
import { AuthController } from "./controller";
import { validateDTO } from "../middlewares";
import { LoginUserDTO, RegisterUserDTO } from "./auth.dto";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    router.post("/login", validateDTO(LoginUserDTO), controller.loginUser);

    router.post(
      "/register",
      validateDTO(RegisterUserDTO),
      controller.registerUser,
    );

    return router;
  }
}
