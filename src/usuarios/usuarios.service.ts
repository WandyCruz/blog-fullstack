import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/auth/dto/create_usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/Prisma.service';
import { loginUsuarioDto } from 'src/auth/dto/login_usuario.dto';

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

  // funcion que actualiza los usuario

  async update(id: number, UpdateUsuarioDto: UpdateUsuarioDto) {
    try {
      return await this.prisma.usuario.update({
        where: { id_usuario: id },
        data: UpdateUsuarioDto,
      });
    } catch (error) {
      console.error('error al actualizar usuario' + error);
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
