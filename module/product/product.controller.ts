import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuardGuard } from '../../common/auth-guard/auth-guard.guard.js';
import 'multer';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create-product')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },{ name: 'gallery', maxCount: 8 }]))
@UseGuards(AuthGuardGuard)
  create(@Body() body: CreateProductDto,@Req() req: any,@UploadedFiles()
   files: { image?: Express.Multer.File[], gallery?: Express.Multer.File[] }) {
    return this.productService.create(body,req.user,files);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
