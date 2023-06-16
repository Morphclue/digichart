import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {environment} from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(environment.port);
}

bootstrap();
