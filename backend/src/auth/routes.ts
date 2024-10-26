import { Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/login", (req, res) => {
      res.json("Login");
    });

    router.use("/register", (req, res) => {
      res.json("Register");
    });

    return router;
  }
}
