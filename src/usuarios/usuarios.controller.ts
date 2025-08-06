import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Roles } from 'src/auth/deoradores/roles.decorator';
import { JwtCookieGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UpdateRolUsuarioDto } from './dto/updateRol_Usuario.dto';

interface idDelResques extends Request {
  user: {
    id_usuario: number;
  };
}
@Controller('usuarios')
@UseGuards(JwtCookieGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // crud que trae la info general del usuario, panel administrativo
  @Roles([2, 3])
  @Get()
  async find() {
    return await this.usuariosService.find();
  }

  // crud que filtra la info del usuario por id, para los perfiles de los usuarios
  @Roles([1, 2, 3])
  @Get('perfil')
  async findOne(@Req() req: idDelResques) {
    const user = req.user;
    console.log('user', user);
    return await this.usuariosService.findOne(user.id_usuario);
  }

  // crud para asignar roles (solo administracion)
  @Roles([2])
  @Patch('addRol/:id')
  async updateRoles(
    @Param('id') id: string,
    @Body() id_rol: UpdateRolUsuarioDto,
  ) {
    return await this.usuariosService.update(+id, id_rol);
  }

  // crud para eliminar cuentas
  @Roles([2])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuariosService.remove(Number(id));
  }
}
