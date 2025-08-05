import { IsString, IsNumber } from 'class-validator';

export class UpdatePublicacionDto {
  @IsString()
  titulo: string;
  @IsString()
  contenido: string;
  @IsNumber()
  id_autor: number;
}
