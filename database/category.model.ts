import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
    @Schema()
export class Category{
    @Prop({required:true,type:String})
        name:string;
    @Prop({required:false,type:String})
        slug:string;
    @Prop({required:false,type:String})
        image:string;
    @Prop({type:Types.ObjectId})
        createdby:Types.ObjectId;
    @Prop({type:Types.ObjectId})
        updatedby:Types.ObjectId;
    @Prop({type:Date})
        deletedAt:Date;
    @Prop({type:Date})
        updatedAt:Date;
    @Prop({type:Date})
        createdAt:Date;
    @Prop({type:Date})
        restoredAt:Date;
}
export const categorySchema=SchemaFactory.createForClass(Category)
export const categorymodel=MongooseModule.forFeature([{name:Category.name,schema:categorySchema}])