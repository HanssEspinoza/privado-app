import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateTestPlanDTO {
  @IsNotEmpty({ message: "El nombre del plan de pruebas es requerido" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsNotEmpty({ message: "El ID del proyecto es requerido" })
  @IsInt({ message: "El ID del proyecto debe ser un número entero" })
  projectId?: number;
}

export class UpdateTestPlanDTO {
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;
}
