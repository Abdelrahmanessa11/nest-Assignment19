import { Types } from "mongoose";
export interface Iproduct{
    name:string,
    description:string,
    slug?:string,
    image?:string,
    gallery?:string[],
    productId:string,
    stock:number,
    rating?:number,
    originalPrice:number,
    salePrice?:number,
    discountpercentage?:number,
    finalPrice?:number,
    categoryId:Types.ObjectId,
    brandId:Types.ObjectId,
    createdby:Types.ObjectId,
    updatedby?:Types.ObjectId,
    deletedAt?:Date,
    updatedAt?:Date,
    createdAt?:Date,
    restoredAt?:Date
}