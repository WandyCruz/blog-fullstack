import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { PrismaService } from 'src/prisma/Prisma.service';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { DeleteComentarioDto } from './dto/delete-comentario.dto';
@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  // crea un nuevo comentario
  async create(createComentarioDto: CreateComentarioDto) {
    try {
      const { id_padre, id_publicacion, id_usuario, contenido } =
        createComentarioDto;
      return await this.prisma.comentario.create({
        data: {
          contenido,
          id_padre: id_padre ?? null,
          id_usuario,
          id_publicacion,
        },
      });
    } catch (error) {
      console.error('error al crear comentario' + error);
      throw error;
    }
  }

  // funcion que muestra todos los comentarios
  async comentarioDePublicacion(id_publicacion: number) {
    try {
      return await this.prisma.comentario.findMany({
        where: { id_publicacion },
      });
    } catch (error) {
      console.error('error al traer comentarios' + error);
      throw error;
    }
  }

  // funcion que filtra los comentarios por el id
  async findOne(id: number) {
    try {
      return await this.prisma.comentario.findUnique({
        where: { id_comentario: id },
      });
    } catch (error) {
      console.error(
        'error al filtrar el comentario con el id' + ' ' + id + error,
      );
      throw error;
    }
  }

  // funcion para editar comentarios
  async update(
    id: number,
    updateComentarioDto: UpdateComentarioDto,
    id_usuario: number,
  ) {
    try {
      const filtrarComentario = await this.prisma.comentario.findUnique({
        where: { id_comentario: id },
      });

      if (id_usuario !== filtrarComentario?.id_usuario) {
        throw new UnauthorizedException(
          'No estas autorizado para actualizar este comnetario este comentario',
        );
      }
      return await this.prisma.comentario.update({
        where: { id_comentario: id },
        data: updateComentarioDto,
      });
    } catch (error) {
      console.error('erro al actualizar el comentario' + error);
    }
  }

  // funcion para eliminar comentarios
  async remove(id: number) {
    try {
      return await this.prisma.comentario.delete({
        where: {
          id_comentario: id,
        },
      });
    } catch (error) {
      console.error('erro al eliminar comentario' + error);
    }
  }

  async removeComent(
    { id_comentario }: DeleteComentarioDto,
    id_usuario: number,
  ) {
    try {
      const comentario = await this.prisma.comentario.findUnique({
        where: {
          id_comentario,
        },
      });
      if (!comentario) {
        throw new Error('comentario no encontrado');
      }

      if (id_usuario !== comentario.id_usuario) {
        throw new Error('No tienes permisos para eliminar este  comnetario');
      }

      return await this.prisma.comentario.delete({
        where: { id_comentario },
      });
    } catch (error) {
      console.error('erro al eliminar comentario' + error);
    }
  }
}
