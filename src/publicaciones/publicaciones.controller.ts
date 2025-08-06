import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionDto } from './dto/update-publicacione.dto';
import { JwtCookieGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/deoradores/roles.decorator';
import { Request } from 'express';
interface Date_de_token extends Request {
  user: {
    id_usuario: number;
  };
}

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}
  // muestra todas la publicaciones
  @Get()
  async findAll() {
    return await this.publicacionesService.findAll();
  }

  @UseGuards(JwtCookieGuard)
  // ruta para crear articulos
  @Roles([2, 3])
  @Post()
  async create(@Body() createPublicacioneDto: CreatePublicacioneDto) {
    return await this.publicacionesService.create(createPublicacioneDto);
  }

  // muestra las publicaciones que  el autor a subido
  @Roles([2, 3])
  @Get('publicaciones_realizadas/:id')
  async findOne(@Req() req: Date_de_token) {
    const user = req.user;
    return await this.publicacionesService.findOne(user.id_usuario);
  }

  // edita una publicacion
  @Roles([2, 3])
  @Patch('actualizar_publicacion')
  async update(
    @Param('id')
    id: string,
    @Body() updatePublicacioneDto: UpdatePublicacionDto,
  ) {
    return await this.publicacionesService.update(+id, updatePublicacioneDto);
  }

  // elimina una publlicacion
  @Roles([2, 3])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.publicacionesService.remove(Number(id));
  }
}
