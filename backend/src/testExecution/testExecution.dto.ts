import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
} from "class-validator";

// Enum para el resultado de la ejecución de la prueba
export enum TestResult {
  PASSED = "PASSED",
  FAILED = "FAILED",
  BLOCKED = "BLOCKED",
  SKIPPED = "SKIPPED",
}

export class CreateTestExecutionDTO {
  @IsNotEmpty({ message: "El ID del caso de prueba es requerido" })
  @IsInt({ message: "El ID del caso de prueba debe ser un número entero" })
  testCaseId?: number;

  @IsNotEmpty({ message: "El ID del ejecutor es requerido" })
  @IsInt({ message: "El ID del ejecutor debe ser un número entero" })
  executedBy?: number;

  @IsNotEmpty({ message: "El resultado es requerido" })
  @IsEnum(TestResult, {
    message: "El resultado debe ser PASSED, FAILED, BLOCKED o SKIPPED",
  })
  result?: TestResult;

  @IsOptional()
  @IsString({ message: "La evidencia debe ser una cadena de texto" })
  evidence?: string;
}

export class UpdateTestExecutionDTO {
  @IsOptional()
  @IsEnum(TestResult, {
    message: "El resultado debe ser PASSED, FAILED, BLOCKED o SKIPPED",
  })
  result?: TestResult;

  @IsOptional()
  @IsString({ message: "La evidencia debe ser una cadena de texto" })
  evidence?: string;
}
