import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { env } from './config/env.service.js';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

  });
   app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform: true,
    }
   ));

  await app.listen(env.port, ()=>{
    console.log(`Server is running on port ${env.port}`);
  });
}

await bootstrap();
