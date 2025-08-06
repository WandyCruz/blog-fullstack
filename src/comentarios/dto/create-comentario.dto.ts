import { IsString, IsNumber } from 'class-validator';

export class CreateComentarioDto {
  @IsNumber()
  id_publicacion: number;
  @IsNumber()
  id_padre: number;
  @IsString()
  contenido: string;
}
