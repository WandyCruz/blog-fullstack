import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  // // no permite espacios en blanco
  // @Transform(({ value }) => value.trim())
  nombre: string;
  @IsEmail()
  correo: string;
  @IsString()
  @MinLength(8)
  // // no permite espacios en blanco
  // @Transform(({ value }) => value.trim())
  contraseña: string;
}
