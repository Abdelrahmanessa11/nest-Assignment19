import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, { HydratedDocument, Types } from "mongoose";
import { IBrand } from "../common/interface/brand.interface.js";
import { generateSlug } from "../common/utltis/slug.ts/slug.js";
export type BrandDocument=HydratedDocument<IBrand>;
@Schema()
export class Brand {
    @Prop({ required: true, type: String })
    name: string
    @Prop({ required: false, type: String })
    slug: string
    @Prop({ required: false, type: String })
    image: string
    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdby: Types.ObjectId
    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedby: Types.ObjectId
    @Prop({ type: Date })
    deletedAt: Date
    @Prop({ type: Date })

    updatedAt: Date
    @Prop({ type: Date })

    createdAt: Date
    @Prop({ type: Date })

    restoredAt: Date
}

export const brandschema=SchemaFactory.createForClass(Brand)
export const brandmodel=MongooseModule.forFeatureAsync([
  {  name:Brand.name,
   useFactory:()=>{
    brandschema.pre('save',function(this){
        if(this.isModified(this.name)){
            this.slug=generateSlug(this.name).toLocaleLowerCase()
        } 
    })
    return brandschema
   }
  }
]
)