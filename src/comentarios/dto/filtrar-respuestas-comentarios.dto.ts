import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class filtarRespuestaDto {
  @Type(() => Number)
  @IsNumber()
  id_padre: number;
}
