import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import 'multer';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../database/category.model.js';
import { Brand } from '../../database/brand.model.js';
import { ICategory } from '../../common/interface/category.interface.js';
import { IBrand } from '../../common/interface/brand.interface.js';
import { randomUUID } from 'crypto';
import { product } from '../../database/product.model.js';
import { Iproduct } from '../../common/interface/product.interface.js';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<ICategory>,
    @InjectModel(Brand.name) private BrandModel: Model<IBrand>,
        @InjectModel(product.name) private productmodel: Model<Iproduct>,

  ) {}
  async create(body: CreateProductDto,user:any,files: { image?: Express.Multer.File[], gallery?: Express.Multer.File[] }) {
let { name,description,originalPrice,categoryId,brandId,stock,salePrice,discountpercentage } = body;
brandId=new Types.ObjectId(brandId);
categoryId=new Types.ObjectId(categoryId);
let existCategory = await this.CategoryModel.findById(categoryId);
if(!existCategory) {
throw new NotFoundException('Category not found');}
let existBrand = this.BrandModel.findById(brandId);
if(!existBrand) {
  throw new NotFoundException('Brand not found');
}   

const finalPrice = salePrice
  ? Number(
      (
        salePrice -
        (salePrice * (discountpercentage ?? 0)) / 100
      ).toFixed(2)
    )
  : originalPrice;
  // let image;
  // let gallery;
  // if (files.image){
  //   image = files.image[0]
  // }
  // if(files.gallery){
  //   gallery=files.gallery.map(item=>item.path)
  // }
  const image = files?.image?.[0]?.path;

const gallery = files?.gallery?.map(item => item.path) ?? [];
  let productId=randomUUID().slice(0,6) as string;
  const addedproduct =await this.productmodel.create({name,description,originalPrice,categoryId,brandId,stock,
    salePrice,discountpercentage,productId,gallery,finalPrice })
    if(addedproduct){
      return {message:'Product added successfully',data:addedproduct}
    }
    else{
      throw new NotFoundException('Product not added');
    }
  }
  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
