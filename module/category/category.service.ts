import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Category, categorymodel } from '../../database/category.model.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from '../../common/interface/category.interface.js';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel (Category.name)private readonly categoryModel: Model<ICategory>
    ) {}

    async GetAllCategories(){
    let data=await this.categoryModel.find()
    return data
       }
       async CreateCategory(data:any,UserId:any) {
     let{name}=data
     let addedCategory=await this.categoryModel.create({name,createdby:UserId})
    if(!addedCategory){
        throw new NotFoundException('error when insert categories')
       } 
    return {message:"category added",data:addedCategory}
       }
       async UpdateCategories(Data:any,CategoryId:any){
        let {name}=Data; 
        console.log('categoryid',name)
        let updateddata=await this.categoryModel.findByIdAndUpdate(CategoryId,{name},{returnDocument:'after'})
        if(!updateddata){
            throw new NotFoundException('Category not found')
        }
        return{
            message:"categories updated",data:updateddata
        }
       }
       async DeleteCategory(CategoryId:any){
        let deletedcategory=await this.categoryModel.findByIdAndDelete(CategoryId)
        if(!deletedcategory){
            throw new BadRequestException('category not found')
        }
        else{
            return{message:'deletedcategory',data:deletedcategory}
        }
    
       }
}
