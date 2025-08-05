import { IsString, IsNumber } from 'class-validator';

export class CreatePublicacioneDto {
  @IsString()
  titulo: string;
  @IsString()
  contenido: string;
  @IsNumber()
  id_autor: number;
}
