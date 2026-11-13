import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class product{
    @Prop({required:true,type:String})
        name:string;

    @Prop({required:true,type:String})
        description:string
    @Prop({type:String,requrired:false})
        slug:string
    @Prop({type:String,required:false})
        image:string
    @Prop({type:[String],required:false})
        gallery:string[]  
    @Prop({required:true,type:String})
        productId:string
    @Prop({required:false,type:Number})
        stock:number;
    @Prop({required:false,type:Number})
        rating?:number;
    @Prop({required:true,type:Number})
        originalPrice:number;
    @Prop({required:false,type:Number})
        salePrice?:number;
    @Prop({required:false,type:Number})
        discountpercentage?:number;
    @Prop({required:false,type:Number})
        finalPrice?:number;
    @Prop({type:Types.ObjectId,ref:'category'})
        categoryId:Types.ObjectId;
    @Prop({type:Types.ObjectId,ref:'brand'})
        brandId:Types.ObjectId;
    @Prop({type:Types.ObjectId,ref:'user'})
        createdby:Types.ObjectId;
    @Prop({type:Types.ObjectId,ref:'user'})
        updatedby?:Types.ObjectId;
    @Prop({type:Date}) 
        deletedAt?:Date;
    @Prop({type:Date})
        updatedAt?:Date;
    @Prop({type:Date})
        createdAt?:Date;
    @Prop({type:Date})
        restoredAt?:Date;
}

export const productSchema=SchemaFactory.createForClass(product)
export const productmodel=MongooseModule.forFeature([{name:product.name,schema:productSchema}])