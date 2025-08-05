import { IsString, IsNumber } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  nombre: string;
  @IsString()
  correo: string;
  @IsString()
  contraseña: string;
  @IsNumber()
  id_rol: number;
}
