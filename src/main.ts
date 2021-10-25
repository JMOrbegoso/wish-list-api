import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	// Setup Swagger
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
