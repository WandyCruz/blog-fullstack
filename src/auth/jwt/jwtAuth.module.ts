import { Module } from '@nestjs/common';
// importamos el modulo de la libreria de jwt
import { JwtModule } from '@nestjs/jwt';
// he importamos el modulo de mi serviceJwt
import { JwtAuthService } from './jwtauth.service';
// importamos confiAuthjService para tener aceso a la variable  de entorno
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // importamos el modulo de la libreria de jwt
    JwtModule.registerAsync({
      // creamos una funcion (useFactory) para proporcionarle los datos de expiracion y clave secreta al topken
      useFactory: (configService: ConfigService) => {
        // variable que pasa la clave secreta al  jwt
        const secret = configService.get<string>('JWT_SECRET');
        //  retornamos la clave y el tiempo de expiracion
        return {
          secret, // Asegúrate de tener esta variable en tu `.env`
          signOptions: { expiresIn: '7d' },
        };
      },
      // he injectamos el confiService
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtAuthService, JwtModule],
})
export class JwtAuthModule {}
