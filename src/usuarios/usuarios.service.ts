import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/auth/dto/create_usuarios.dto';
import { PrismaService } from 'src/prisma/Prisma.service';
import { loginUsuarioDto } from 'src/auth/dto/login_usuario.dto';
import { UpdateUsuarioDto } from '../auth/dto/update-usuario.dto';
import { UpdateRolUsuarioDto } from './dto/updateRol_Usuario.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // Crear usuario
  async create({ correo, contraseña, nombre }: CreateUsuarioDto) {
    try {
      const validation = await this.prisma.usuario.findUnique({
        where: { correo },
      });

      if (validation) {
        throw new BadRequestException('usuario ya existente');
      }

      return await this.prisma.usuario.create({
        data: { contraseña, correo, nombre, id_rol: 1 },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('error al crear el usuario: ' + error.message);
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al crear usuario');
    }
  }

  // Login
  async login({ correo }: loginUsuarioDto): Promise<Usuario> {
    try {
      const user: Usuario | null = await this.prisma.usuario.findUnique({
        where: { correo },
      });

      if (!user) {
        throw new BadRequestException('usuario no existente');
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al hacer login');
    }
  }

  // Obtener todos los usuarios
  async find(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  // Obtener usuario por id
  async findOne(id: number): Promise<Usuario | null> {
    try {
      return await this.prisma.usuario.findUnique({
        where: { id_usuario: id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('error al traer los datos del usuario: ' + error.message);
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al buscar usuario');
    }
  }

  // Actualizar rol de usuario
  async update(id: number, { id_rol }: UpdateRolUsuarioDto): Promise<Usuario> {
    try {
      if (isNaN(id_rol)) {
        throw new BadRequestException('id rol no valido');
      }

      const user: Usuario = await this.prisma.usuario.update({
        where: { id_usuario: id },
        data: { id_rol },
      });

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('error al actualizar rol de usuario: ' + error.message);
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al actualizar rol');
    }
  }

  // Actualizar perfil de usuario
  async updatePerfil(
    id_usuario: number,
    { contraseña, correo, nombre }: UpdateUsuarioDto,
  ): Promise<Usuario> {
    try {
      const update: Usuario = await this.prisma.usuario.update({
        where: { id_usuario },
        data: { contraseña, correo, nombre },
      });
      return update;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('error al actualizar perfil: ' + error.message);
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al actualizar perfil');
    }
  }

  // Eliminar usuario
  async remove(id: number): Promise<Usuario> {
    try {
      const deleted: Usuario = await this.prisma.usuario.delete({
        where: { id_usuario: id },
      });
      return deleted;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('error al eliminar usuario: ' + error.message);
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error desconocido al eliminar usuario');
    }
  }
}
