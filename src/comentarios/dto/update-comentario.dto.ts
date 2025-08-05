import { IsString, IsNumber } from 'class-validator';

export class UpdateComentarioDto {
  @IsNumber()
  id_publicacion: number;
  @IsNumber()
  id_usuario: number;
  @IsNumber()
  id_padre: number;
  @IsString()
  contenido: string;
}
