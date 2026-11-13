import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrand } from '../../common/interface/brand.interface.js';
import { Brand } from '../../database/brand.model.js';
import { after } from 'node:test';

@Injectable()
export class BrandService {

constructor(
    @InjectModel(Brand.name) private readonly brandmodel:Model<IBrand>
){
}
async Getallbrands(){
let data=await this.brandmodel.find()
return data
   }
   async CreateBrand(data:any,UserId:any) {
 let{name}=data
 let addedBrand=await this.brandmodel.create({name,createdby:UserId})
if(!addedBrand){
    throw new NotFoundException('error when insert brands')
   } 
return {message:"brand added",data:addedBrand}
   }
   async UpdateBrands(Data:any,BrandId:any){
    let {name}=Data; 
    console.log('brandid',name)
    let updateddata=await this.brandmodel.findByIdAndUpdate(BrandId,{name},{returnDocument:'after'})
    if(!updateddata){
        throw new NotFoundException('Brand not found')
    }
    return{
        message:"brands updated",data:updateddata
    }
   }
   async Deletedbrand(BrandId:any){
    let deletedbrand=await this.brandmodel.findByIdAndDelete(BrandId)
    if(!deletedbrand){
        throw new BadRequestException('brand not found')
    }
    else{
        return{message:'deletedbrand',data:deletedbrand}
    }

   }
}