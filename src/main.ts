import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers)
  });
  await app.listen(8000);
}
bootstrap();
