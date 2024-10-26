import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
} from "class-validator";

// Enum para el estado del defecto
export enum DefectStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export class CreateDefectDTO {
  @IsNotEmpty({ message: "El título del defecto es requerido" })
  @IsString({ message: "El título debe ser una cadena de texto" })
  title?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsNotEmpty({ message: "El estado es requerido" })
  @IsEnum(DefectStatus, {
    message: "El estado debe ser OPEN, IN_PROGRESS, RESOLVED o CLOSED",
  })
  status?: DefectStatus;

  @IsNotEmpty({ message: "El ID del reportador es requerido" })
  @IsInt({ message: "El ID del reportador debe ser un número entero" })
  reportedBy?: number;

  @IsOptional()
  @IsInt({ message: "El ID del asignado debe ser un número entero" })
  assignedTo?: number;

  @IsOptional()
  @IsInt({ message: "El ID del caso de prueba debe ser un número entero" })
  testCaseId?: number;
}

export class UpdateDefectDTO {
  @IsOptional()
  @IsString({ message: "El título debe ser una cadena de texto" })
  title?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsOptional()
  @IsEnum(DefectStatus, {
    message: "El estado debe ser OPEN, IN_PROGRESS, RESOLVED o CLOSED",
  })
  status?: DefectStatus;

  @IsOptional()
  @IsInt({ message: "El ID del asignado debe ser un número entero" })
  assignedTo?: number;
}
