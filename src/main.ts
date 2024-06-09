import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.API_PORT || 3000
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}
bootstrap();
