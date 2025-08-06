import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://tu-frontend-url.com',
    credentials: true,
  });
  app.use(cookieParser());
  const puerto = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(puerto);
  console.log('servidor correindo en' + ' ' + puerto);
}

void bootstrap();
