import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateProjectDTO {
  @IsNotEmpty({ message: "El nombre del proyecto es requerido" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;

  @IsNotEmpty({ message: "El ID del propietario es requerido" })
  @IsInt({ message: "El ID del propietario debe ser un número entero" })
  ownerId?: number;
}

export class UpdateProjectDTO {
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  description?: string;
}
