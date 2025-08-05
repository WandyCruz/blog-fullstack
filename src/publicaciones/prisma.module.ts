import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
