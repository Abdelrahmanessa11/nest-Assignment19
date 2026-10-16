import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { env } from './config/env.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(env.port, ()=>{
    console.log(`Server is running on port ${env.port}`);
  });
}

await bootstrap();
