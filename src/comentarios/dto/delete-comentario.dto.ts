import { IsNumber } from 'class-validator';

export class DeleteComentarioDto {
  @IsNumber()
  id_comentario: number;
  @IsNumber()
  id_usuario: number;
}
