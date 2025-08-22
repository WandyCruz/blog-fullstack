import { IsString, MinLength, IsEmail, Matches } from 'class-validator';
export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  @Matches(/^\S*$/, { message: 'el nombre no puede contener espacios' })
  nombre: string;
  @IsEmail()
  correo: string;
  @IsString()
  @MinLength(8)
  @Matches(/^\S*$/, { message: 'La contraseña no puede contener espacios' })
  contraseña: string;
}
