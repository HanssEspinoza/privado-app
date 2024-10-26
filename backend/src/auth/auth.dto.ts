import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDTO {
  @IsEmail({}, { message: "Debe ser un email válido" })
  email?: string;

  @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password?: string;

  @IsNotEmpty({ message: "El nombre no puede estar vacío" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  name?: string;

  @IsString({ message: "El rol debe ser una cadena de texto" })
  role?: string;
}

export class LoginUserDTO {
  @IsEmail({}, { message: "Debe ser un email válido" })
  email?: string;

  @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
  password?: string;
}
