import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthController } from './module/auth/auth.controller.js';
import { AuthService } from './module/auth/auth.service.js';
import { UserController } from './module/user/user.controller.js';
import { UserService } from './module/user/user.service.js';
import { ConfigModule } from '@nestjs/config';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
 ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:['.env.dev', '.env.prod']
 })
  ],
  controllers: [AppController,AuthController,UserController],
  providers: [AppService,AuthService,UserService],
})
export class AppModule {}
