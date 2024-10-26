import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  registerUser = async (req: Request, res: Response) => {
    res.json("Register");
  };

  loginUser = async (req: Request, res: Response) => {
    res.json("Login");
  };
}
