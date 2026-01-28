import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const logger = new Logger("bootstrap")

  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  await app.listen(envs.PORT ?? 3000);
  logger.log(`✅ Server listening on port ${3000}`)
}
bootstrap();
