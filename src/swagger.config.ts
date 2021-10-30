import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Wish List API')
	.setDescription('API of Wish List.')
	.setVersion('0.0.1')
	.build();
