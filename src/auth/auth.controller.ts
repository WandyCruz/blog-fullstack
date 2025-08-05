import { Controller } from '@nestjs/common';
import { Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create_usuarios.dto';
import { loginUsuarioDto } from './dto/login_usuario.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  // ruta de registro de usuarios
  @Post('register')
  createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.auth.create(createUsuarioDto);
  }
  // ruta de login de usuarios
  @Post('login')
  async login(
    @Body() loginUsuarioDto: loginUsuarioDto,
    // acedemos al metodo response del servidor
    @Res({ passthrough: true }) res: Response,
  ) {
    // recibimos el token de AuthService
    const token = await this.auth.login(loginUsuarioDto);

    // creamos la cookie con el token, httpOnly para que no sea acesible desde el js del frontend, y tiempo de expiracion
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false, // true si usas HTTPS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    // retornamos un mensaje
    return token;
  }
}
