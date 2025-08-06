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
  await app.listen(process.env.PORT || 3000);
  console.log('servidor correindo en' + ' ' + process.env.PORT);
}

void bootstrap();
