import { IsString, MinLength, IsEmail } from 'class-validator';
export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsEmail()
  correo: string;
  @IsString()
  @MinLength(8)
  // // no permite espacios en blanco
  contraseña: string;
}
