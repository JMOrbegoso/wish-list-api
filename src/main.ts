import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';
import { swaggerDocument } from './swagger.document';

async function bootstrap(): Promise<void> {
  // Create app
  const app = await NestFactory.create(AppModule);

  // Set API global prefix
  app.setGlobalPrefix('api');

  // Setup Swagger documentation
  SwaggerModule.setup('/', app, swaggerDocument);

  // Enable Auto-validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start server
  await app.listen(config.SERVER_PORT);
}
bootstrap();
