import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // To get the env variable
  const PORT = process.env.SERVER_PORT || 3000;
  const ENV = process.env.NODE_ENV;
  const URL = process.env.DOMAIN_URL_APP;

  // Config CORS to allow requests from the url
  app.enableCors({
    origin: [URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Runnig API in mode: [${ENV}] on port: ${PORT}`);
  });
}
bootstrap();
