import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { AuthModule } from './auth/auth.module';
import { EncriptacionService } from './auth/encriptacion/encriptacion.service';
import { EncriptacionModule } from './auth/encriptacion/encriptacion.module';
import { JwtAuthModule } from './auth/jwt/jwtAuth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RolesModule,
    UsuariosModule,
    PublicacionesModule,
    ComentariosModule,
    AuthModule,
    EncriptacionModule,
    JwtAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [EncriptacionService],
})
export class AppModule {}
