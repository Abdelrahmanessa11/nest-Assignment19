import { Module } from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { BrandController } from './brand.controller.js';
import { brandmodel } from '../../database/brand.model.js';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports:[brandmodel]
})
export class BrandModule {}
