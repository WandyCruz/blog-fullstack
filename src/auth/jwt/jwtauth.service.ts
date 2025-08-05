// servicio que genera  el  token
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthService {
  // inyectamos las dependecncias de la  libreria jwt
  constructor(private readonly jwtService: JwtService) {}

  // funcion que genera el token, recibe el valos(payload) ylo comvierte en un token
  async generarToken(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
