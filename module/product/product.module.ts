import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { BrandModule } from '../brand/brand.module.js';
import { CategoryModule } from '../category/category.module.js';
import { categorymodel } from '../../database/category.model.js';
import { brandmodel } from '../../database/brand.model.js';
import { productmodel } from '../../database/product.model.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [CategoryModule,BrandModule,brandmodel,categorymodel,productmodel],
})
export class ProductModule {}
