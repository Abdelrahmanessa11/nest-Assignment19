import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Tokenservices } from './common/services/token.servies.js';
import { RedisModule } from './common/services/redis services/redis.module.js';
import { AuthModule } from './module/auth/auth.module.js';
import { env } from './config/env.service.js';
import { InjectConnection } from '@nestjs/mongoose';
import { BrandModule } from './module/brand/brand.module.js';
import { CategoryModule } from './module/category/category.module.js';
import { ProductModule } from './module/product/product.module.js';

@Module({
  imports: [
 ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:['.env.dev', '.env.prod']
 }),
 MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: env.databaseUrl
    ,
    connectionFactory: async (connection: any) => {
      await connection.on ('connected',()=>{
      console.log('database is connected ');
if(connection.readyState === 1){
  console.log('database is connected and ready to use');
}
      });
      connection.on ('error',(err:any)=>{
        console.log('database is not connected ');
        console.log(err);
  });
  return connection;
 }

 })
 }),
  AuthModule,
  RedisModule ,
  BrandModule,
  CategoryModule,
  ProductModule
  ],
  controllers: [AppController,],
  providers: [AppService,Tokenservices],
})
export class AppModule {}


