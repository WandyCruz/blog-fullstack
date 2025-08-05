// modulo del EncriptacionService
import { Module } from '@nestjs/common';
import { EncriptacionService } from './encriptacion.service';
@Module({
  providers: [EncriptacionService],
  exports: [EncriptacionService],
})
export class EncriptacionModule {}
