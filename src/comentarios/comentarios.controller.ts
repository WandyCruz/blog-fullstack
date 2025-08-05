import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { UseGuards } from '@nestjs/common';
import { JwtCookieGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/deoradores/roles.decorator';
import { DeleteComentarioDto } from './dto/delete-comentario.dto';
@UseGuards(JwtCookieGuard)
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}
  @Roles([1, 2, 3])
  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    return await this.comentariosService.create(createComentarioDto);
  }

  @Roles([1, 2, 3])
  @Get()
  async findAll(@Param() id_publicacion: number) {
    return await this.comentariosService.comentarioDePublicacion(
      id_publicacion,
    );
  }
  @Roles([2])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.comentariosService.findOne(+id);
  }
  @Roles([1, 2, 3])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    return await this.comentariosService.update(
      Number(id),
      updateComentarioDto,
    );
  }

  // ruta para borrar cualquier coemntario, solo administradpores
  @Roles([2])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.comentariosService.remove(Number(id));
  }

  // ruta para eliminar comentario publicados por la cuenta logueda
  @Roles([1, 2, 3])
  @Delete(':id')
  async removeComentuser(@Body('id') id: DeleteComentarioDto) {
    return await this.comentariosService.removeComent(id);
  }
}
