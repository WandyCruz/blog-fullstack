import { Controller } from '@nestjs/common';
import { Post, Body, Res, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create_usuarios.dto';
import { loginUsuarioDto } from './dto/login_usuario.dto';
import { Request, Response } from 'express';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UseGuards } from '@nestjs/common';
import { JwtCookieGuard } from './guard/auth.guard';
import { Roles } from './deoradores/roles.decorator';
interface idDelResques extends Request {
  user: {
    id_usuario: number;
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  // ruta de registro de usuarios
  @Post('register')
  async createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const user = await this.auth.create(createUsuarioDto);
      return { registro_exitoso: true, user };
    } catch (error) {
      return { registro_exitoso: false, mensage: 'error al registrarse' };
    }
  }
  // ruta de login de usuarios
  @Post('login')
  async login(
    @Body() loginUsuarioDto: loginUsuarioDto,
    // acedemos al metodo response del servidor
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      // recibimos el token de AuthService
      const token = await this.auth.login(loginUsuarioDto);

      // creamos la cookie con el token, httpOnly para que no sea acesible desde el js del frontend, y tiempo de expiracion
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: false, // true si usas HTTPS
        sameSite: 'lax',
        maxAge: 1000 * 90 * 90 * 54, // 1 día
      });

      // retornamos un mensaje
      return { registro_exitoso: true, mensage: 'login exitoso' };
    } catch (error) {
      return { registro_exitoso: false, mensage: 'login fallido', error };
    }
  }

  // crud para editar la infi de los usuarios (correo, password, nombre)
  @UseGuards(JwtCookieGuard)
  @Roles([1, 2, 3])
  @Patch('Editar')
  async update(
    @Req() req: idDelResques,
    @Body() UpdateUsuarioDto: UpdateUsuarioDto,
  ) {
    const usuario = req;
    console.log('id user', usuario.user.id_usuario);
    return await this.auth.updatePerfil(
      usuario.user.id_usuario,
      UpdateUsuarioDto,
    );
  }
}
