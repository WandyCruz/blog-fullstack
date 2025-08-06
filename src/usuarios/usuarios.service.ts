import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/auth/dto/create_usuarios.dto';
import { PrismaService } from 'src/prisma/Prisma.service';
import { loginUsuarioDto } from 'src/auth/dto/login_usuario.dto';
import { UpdateUsuarioDto } from '../auth/dto/update-usuario.dto';
import { UpdateRolUsuarioDto } from './dto/updateRol_Usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // recibe los datos de authService, verifica el correo  y si no existe cres un nuevo user
  async create({ correo, contraseña, nombre }: CreateUsuarioDto) {
    try {
      // filtra el correo ingresado en la base de datos
      const validation = await this.prisma.usuario.findUnique({
        where: { correo: correo },
      });

      // condiciona la respuesta
      if (validation) {
        throw new BadRequestException('usuario ya existente');
      }

      // crea el usuario en la base de datos

      return await this.prisma.usuario.create({
        data: { contraseña, correo, nombre, id_rol: 1 },
      });
    } catch (error) {
      console.error('error al crear el usuario');
      throw error;
    }
  }

  // login, recive un password y  un correo
  async login({ correo }: loginUsuarioDto) {
    try {
      // verifica  que el usuario exista
      const user = await this.prisma.usuario.findUnique({
        where: { correo },
      });
      //  condiciona la filtracion
      if (!user) {
        throw new BadRequestException('usuario no existente');
      }

      return user;
    } catch (error) {
      console.error('error al hacer login' + error);
    }
  }

  // funcion que trae la informacion de los usuarios
  async find() {
    return await this.prisma.usuario.findMany();
  }

  // funcion que filtra los usuarios por id
  async findOne(id: number) {
    try {
      return await this.prisma.usuario.findUnique({
        where: { id_usuario: id },
      });
    } catch (error) {
      console.error('error al traer los datos  del  usuario');
      throw error;
    }
  }

  // funcion que actualiza los roles
  async update(id: number, id_rol: UpdateRolUsuarioDto) {
    try {
      if (isNaN(id_rol.id_rol)) {
        throw new BadRequestException('id rol no valido');
      }

      const user = await this.prisma.usuario.update({
        where: { id_usuario: id },
        data: {
          id_rol: id_rol.id_rol,
        },
      });

      return user;
    } catch (error) {
      console.error('error al actualizar rol de  usuario' + error);
      throw error;
    }
  }

  // funcion parta actualizar el perfil  del usuario

  async updatePerfil(
    id_usuario: number,
    { contraseña, correo, nombre }: UpdateUsuarioDto,
  ) {
    try {
      const update = await this.prisma.usuario.update({
        where: { id_usuario },
        data: {
          contraseña,
          correo,
          nombre,
        },
      });
      return update;
    } catch (error) {
      console.error('error al actualizar perfil' + error);
      throw error;
    }
  }

  // funcion que elimina usuario

  async remove(id: number) {
    try {
      return await this.prisma.usuario.delete({
        where: { id_usuario: id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      throw error;
    }
  }
}
