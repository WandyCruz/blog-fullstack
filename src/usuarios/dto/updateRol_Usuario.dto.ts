import { MinLength, IsNumber } from 'class-validator';

export class UpdateRolUsuarioDto {
  @IsNumber()
  @MinLength(1)
  id_rol: number;
}
