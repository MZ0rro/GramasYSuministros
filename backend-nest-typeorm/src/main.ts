import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Esto es clave para Thunder Client
      },
    }),
  );
  
  app.enableCors();
  
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
}
bootstrap();