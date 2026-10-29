import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UsuarioDto {
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;
}
