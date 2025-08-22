import { Injectable } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionDto } from './dto/update-publicacione.dto';
import { PrismaService } from 'src/prisma/Prisma.service';

@Injectable()
export class PublicacionesService {
  constructor(private prisma: PrismaService) {}

  //  extrae todos los articulos publicados
  async findAll() {
    try {
      return await this.prisma.publicacion.findMany({
        include: {
          autor: true,
        },
      });
    } catch (error) {
      console.error('error al optener los articulos' + error);
      throw error;
    }
  }

  // filtra los articulos por id
  async findOne(id: number) {
    try {
      return await this.prisma.publicacion.findMany({
        where: { id_autor: id },
      });
    } catch (error) {
      console.error('error al filtar los articulos' + error);
    }
  }

  async create(createPublicacioneDto: CreatePublicacioneDto, id_autor: number) {
    try {
      return await this.prisma.publicacion.create({
        data: { ...createPublicacioneDto, id_autor: id_autor },
      });
    } catch (error) {
      console.error('error al crear el artuiculo' + error);
      throw error;
    }
  }

  // actualiza articulos filtrando por id
  async update(id: number, updatePublicacioneDto: UpdatePublicacionDto) {
    try {
      return await this.prisma.publicacion.update({
        where: { id_publicacion: id },
        data: updatePublicacioneDto,
      });
    } catch (error) {
      console.error('error al actualizar articulo' + error);
    }
  }

  // elimina una publicacion
  async remove(id: number) {
    try {
      return await this.prisma.publicacion.delete({
        where: { id_publicacion: id },
      });
    } catch (error) {
      console.error('error al elimirrticulo' + error);
    }
  }
}
