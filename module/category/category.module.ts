import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryController } from './category.controller.js';
import { categorymodel } from '../../database/category.model.js';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [categorymodel]
})
export class CategoryModule {}
