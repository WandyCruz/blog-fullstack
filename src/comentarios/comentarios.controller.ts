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
import { Request } from 'express';
import { Res } from '@nestjs/common';
interface Id_usuario_Jwt extends Request {
  user: {
    id_usuario: number;
  };
}

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // muestra comentarios en las publicaciones
  @Get()
  async findAll(@Param() id_publicacion: number) {
    return await this.comentariosService.comentarioDePublicacion(
      id_publicacion,
    );
  }
  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    return await this.comentariosService.create(createComentarioDto);
  }
  // ruta para eliminar comentario publicados por la cuenta logueda
  @Delete('eliminarComentario')
  async removeComentuser(
    @Body('id') id_comentario: DeleteComentarioDto,
    @Res() req: Id_usuario_Jwt,
  ) {
    const user = req.user;
    return await this.comentariosService.removeComent(
      id_comentario,
      user.id_usuario,
    );
  }

  // ruta para editar comentarios
  @Patch('editarComnetarios/:id')
  async update(
    @Param('id') id: string,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @Res() req: Id_usuario_Jwt,
  ) {
    const user = req.user;
    return await this.comentariosService.update(
      Number(id),
      updateComentarioDto,
      user.id_usuario,
    );
  }

  @UseGuards(JwtCookieGuard)
  // ruta para filtrar comentarios por id
  @Roles([2])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.comentariosService.findOne(+id);
  }

  // ruta para borrar cualquier comentario, solo administradpores
  @Roles([2])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.comentariosService.remove(Number(id));
  }
}
