import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from './prisma.module'; // este importa PrismaService
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, JwtModule], // Importa el módulo de Prisma para usar la BD
  controllers: [UsuariosController], // Controlador para las rutas de usuarios
  providers: [UsuariosService], // Servicio con la lógica de negocio
  exports: [UsuariosService], // Se exporta para que otros módulos (como Auth) puedan usarlo
})
export class UsuariosModule {}
