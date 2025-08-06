import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
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
import { filtarRespuestaDto } from './dto/filtrar-respuestas-comentarios.dto';
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

  // ruta para filtrar las respuestas a los  comentarios
  @Get('respuestas')
  async findOne(@Body() id_padre: filtarRespuestaDto) {
    return await this.comentariosService.respuestasDeComentarios(id_padre);
  }
  @UseGuards(JwtCookieGuard)
  @Roles([1, 2, 3])
  // ruta para cerar comentario
  @Post()
  async create(
    @Body() createComentarioDto: CreateComentarioDto,
    @Req() req: Id_usuario_Jwt,
  ) {
    const user = req.user;
    console.log(user);
    return await this.comentariosService.create(
      createComentarioDto,
      user.id_usuario,
    );
  }
  @Roles([1, 2, 3])
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

  @Roles([1, 2, 3])
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

  // ruta para borrar cualquier comentario, solo administradpores
  @Roles([2])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.comentariosService.remove(Number(id));
  }
}
