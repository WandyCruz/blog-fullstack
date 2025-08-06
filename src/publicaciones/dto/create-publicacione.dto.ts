import { IsString } from 'class-validator';

export class CreatePublicacioneDto {
  @IsString()
  titulo: string;
  @IsString()
  contenido: string;
}
