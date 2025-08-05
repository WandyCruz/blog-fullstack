// decorador que maneja los roles
import { SetMetadata } from '@nestjs/common';

// definimos una funcion que recive props y los agrega a los Setmetadata con un nombre
export const Roles = (rol) => SetMetadata('roles', rol);
