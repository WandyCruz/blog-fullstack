import { Injectable } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionDto } from './dto/update-publicacione.dto';
import { PrismaService } from 'src/prisma/Prisma.service';

@Injectable()
export class PublicacionesService {
  constructor(private prisma: PrismaService) {}
  async create(createPublicacioneDto: CreatePublicacioneDto) {
    try {
      return await this.prisma.publicacion.create({
        data: createPublicacioneDto,
      });
    } catch (error) {
      console.error('error al crear el artuiculo' + error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.publicacion.findMany();
    } catch (error) {
      console.error('error al optener los articulos' + error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.publicacion.findMany({
        where: { id_autor: id },
      });
    } catch (error) {
      console.error('error al filtar los articulos' + error);
    }
  }

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
