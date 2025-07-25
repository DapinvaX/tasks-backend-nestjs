import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Cargar variables de entorno al inicio
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }));
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // URL del frontend de Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Usar el puerto desde el archivo .env o 3000 como valor predeterminado
  await app.listen(process.env.PORT || 3000);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
