import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  // const puerto = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(3001);
  console.log('servidor correindo en' + ' ' + 'http://localhost:3001');
}

void bootstrap();
