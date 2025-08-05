import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
// importamos el modulo del servicio que encripta la password
import { EncriptacionModule } from './encriptacion/encriptacion.module';
// importamos el modulo del JwtAuthService(mi archivo, no  de la libreria)
import { JwtAuthModule } from './jwt/jwtAuth.module';
// importamos el cookie module
@Module({
  imports: [UsuariosModule, EncriptacionModule, JwtAuthModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
