import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioDto } from './dto/create_usuarios.dto';
// hash de contrasenas
import { loginUsuarioDto } from './dto/login_usuario.dto';
import { EncriptacionService } from './encriptacion/encriptacion.service';
import { JwtAuthService } from './jwt/jwtauth.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly encriptacionService: EncriptacionService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  // validacion de usuarios al registarse
  async create({ correo, contraseña, nombre }: CreateUsuarioDto) {
    // wenviamos la password en texto plano a hashedPassword
    const hashedPassword =
      await this.encriptacionService.hashPassword(contraseña);
    // envia todos los datos  a usuariosService, el cual filtra el  email, y si no esta registrado en la base de datos, genera el nuevo usuario
    return await this.usuariosService.create({
      correo,
      // envia la contrasena hasheada
      contraseña: hashedPassword,
      nombre,
    });
  }

  async login({ correo, contraseña }: loginUsuarioDto) {
    const user = await this.usuariosService.login({ contraseña, correo });
    if (!user) {
      throw new UnauthorizedException('Email or password wrong');
    }
    // compara la password encriptada
    const validacionPassword = await this.encriptacionService.comparePasswords(
      contraseña,
      user?.contraseña,
    );

    if (!validacionPassword) {
      throw new UnauthorizedException('email or password is wrong');
    }

    const token = await this.jwtAuthService.generarToken({
      id: user.id_usuario,
      id_rol: user.id_rol,
    });

    return token;
  }
}
