import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateTestCaseDTO {
  @IsNotEmpty({ message: "El nombre del caso de prueba es requerido" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsNotEmpty({ message: "La descripción es requerida" })
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsNotEmpty({ message: "El resultado esperado es requerido" })
  @IsString({ message: "El resultado esperado debe ser una cadena de texto" })
  expectedResult?: string;

  @IsNotEmpty({ message: "El ID del plan de prueba es requerido" })
  @IsInt({ message: "El ID del plan de prueba debe ser un número entero" })
  testPlanId?: number;
}

export class UpdateTestCaseDTO {
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsOptional()
  @IsString({ message: "El resultado esperado debe ser una cadena de texto" })
  expectedResult?: string;
}
