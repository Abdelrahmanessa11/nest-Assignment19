import { IsMongoId, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
    @IsString()
    @MinLength(20)
    @MaxLength(100)
    name!: string;

    @IsString()
    @MinLength(20)
    @MaxLength(20000)
    description!: string;
@IsOptional()
    @IsString()
  productId!: string;
  @IsNumber()
  @IsPositive()
  originalPrice!: number;
    @IsNumber()
  @IsPositive()
  @IsOptional()
  salePrice!: number;
 
     @IsNumber()
  @IsPositive()
  @IsOptional()
  @MaxLength(100)
  @MinLength(0)
  discountpercentage?: number
  @IsNumber()
  @IsPositive()
  @IsOptional()
    stock!: number;
    @IsMongoId()
    categoryId!: Types.ObjectId;
    @IsMongoId()
    brandId!: Types.ObjectId;
   
    @IsOptional()
    updatedAt!: Date;
    @IsOptional()
    createdAt!: Date
@IsOptional()
    restoredAt!: Date;
    @IsOptional() 
    deletedAt!: Date;

    
}
