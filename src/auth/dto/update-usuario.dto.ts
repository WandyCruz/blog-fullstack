import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsEmail()
  correo: string;
  @IsString()
  @MinLength(8)
  contraseña: string;
}
