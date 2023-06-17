import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';

import {AppModule} from './app.module';
import {environment} from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  await app.listen(environment.port);
}

bootstrap();
