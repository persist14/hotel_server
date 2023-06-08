import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: process.env.PREFIX,
  });
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(4001);
}

bootstrap();
