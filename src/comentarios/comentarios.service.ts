import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { PrismaService } from 'src/prisma/Prisma.service';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { DeleteComentarioDto } from './dto/delete-comentario.dto';
import { filtarRespuestaDto } from './dto/filtrar-respuestas-comentarios.dto';
@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  // crea un nuevo comentario
  async create(
    { contenido, id_padre, id_publicacion }: CreateComentarioDto,
    id_usuario: number,
  ) {
    try {
      if (isNaN(id_usuario)) {
        throw new Error('inicia sesion para poder comentar');
      }
      return await this.prisma.comentario.create({
        data: {
          contenido,
          id_padre: id_padre ?? null,
          id_usuario: id_usuario,
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
        where: { id_publicacion, id_padre: null },
      });
    } catch (error) {
      console.error('error al traer comentarios' + error);
      throw error;
    }
  }

  // funcion que filtra las respuestas a los comentarios
  async respuestasDeComentarios(filtarRespuestaDto: filtarRespuestaDto) {
    try {
      const comentario = await this.prisma.comentario.findMany({
        where: { id_padre: filtarRespuestaDto.id_padre },
      });

      if (comentario.length === 0) {
        throw new NotFoundException('Este comentario no tiene respuestas');
      }
      return comentario;
    } catch (error) {
      console.error('error al traer las respuestas de los  comentarios');
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
          'No estas autorizado para actualizar este comnetario',
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

  // funcion para eliminar comentarios generales, solo administracion
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
