import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ConfigService } from '@nestjs/config';
// metodo de nest para aceder a los decoradores personalizados
import { Reflector } from '@nestjs/core';
// lo que se espera en el token
interface jwPayload {
  id: number;
  rol_id: number;
}
@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // llamamos el metodo de request de expres, en su metodo get
    const request = context.switchToHttp().getRequest<Request>();
    // optenemos los roles desde reflector(decorador creado)
    const rol = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // opteenmos el token
    const token = (request.cookies?.auth_token ?? '') as string;
    // condicion que evalua que el token existe en la cookie
    if (!token) {
      throw new UnauthorizedException('no hay token');
    }
    try {
      //   extraemos la clave secreta desde this.configService, en su metodo get, que a la ves importa la  variable de entorno
      const secret = this.configService.get<string>('JWT_SECRET');
      //verificamos el token
      const decoded = this.jwtService.verify<jwPayload>(token, {
        secret: secret,
      });

      // enviamos el id proveniente del token al usauriosService para que filtre el id
      const user = await this.usuariosService.findOne(decoded.id);
      // consicionamos si el usuario  filtrado existe
      if (!user) {
        throw new UnauthorizedException('usuario no encontrado');
      }
      // vemos si en el areglo rol, se encuentra el rol del usuario filtrado
      if (!rol.includes(user.id_rol)) {
        throw new UnauthorizedException('no tienes permisos');
      }
      // si el token pasa todas las condiciones se retorna true y da aceso
      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido' + error);
    }
  }
}
