import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // To get the env variable 
  const PORT = process.env.SERVER_PORT || 3000;
  const ENV = process.env.NODE_ENV;
  await app.listen(PORT, () => {
    console.log(`Runnig API in mode: [${ENV}] on port: ${PORT}`);
  });
}
bootstrap();
