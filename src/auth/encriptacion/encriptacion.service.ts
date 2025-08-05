import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncriptacionService {
  // definimos una vartiable que continee la cantida de caracteres aleactorios
  private readonly saltRounds = 12;

  // funcion que recibe la password y la hashea
  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, this.saltRounds);
  }

  // funcion que compara la password en texto plano que envia el usuario con la hashseada en la base de datos
  async comparePasswords(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
