import { Types } from "mongoose";

export interface IBrand{

    name:string,
    slug:string,
    image:string,
    createdby:Types.ObjectId,
    updatedby:Types.ObjectId,
    deletedAt:Date,
    updatedAt:Date,
    createdAt:Date,
    restoredAt:Date

}