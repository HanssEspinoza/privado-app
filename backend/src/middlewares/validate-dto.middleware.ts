import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDTO(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const messages = errors.map((error) =>
        Object.values(error.constraints || {}).join(", "),
      );
      res.status(400).json({ errors: messages });
      return;
    }

    next();
  };
}
