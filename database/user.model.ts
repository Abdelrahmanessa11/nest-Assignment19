import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { boolean } from "zod";

const enum GenderEnum {
Male, Female
 
}
@Schema()
export class User { // user model
@Prop({ required: true, type: String })
name !: string
@Prop({ required: true, type: String })
email: string

@Prop({ required: true, type: String })
password: string
@Prop({ required: true, type: String })
phone: string
@Prop({ required: false, type: String })
provider: string
@Prop({ required: false, type: String, default: GenderEnum.Male })
gender ?: string
@Prop({default:"0",type:String})
role:String
@Prop({default:false,type:Boolean})
isverified:Boolean
}

export const userSchema = SchemaFactory.createForClass (User)

export const userModel = MongooseModule. forFeature( [
{ name: User.name, schema: userSchema }
])