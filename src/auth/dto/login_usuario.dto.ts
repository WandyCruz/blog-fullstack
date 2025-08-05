import { IsString, MinLength, IsEmail } from 'class-validator';

export class loginUsuarioDto {
  @IsEmail()
  correo: string;
  @IsString()
  @MinLength(8)
  // // no permite espacios en blanco
  // @Transform(({ value }) => value.trim())
  contraseña: string;
}
