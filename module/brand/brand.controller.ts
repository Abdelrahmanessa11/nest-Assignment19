import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { AuthGuardGuard } from '../../common/auth-guard/auth-guard.guard.js';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('/get-all-brands')
 async  GetAllBrands(){
    let data=await this.brandService.Getallbrands()
    return data
  }
     @UseGuards(AuthGuardGuard)

  @Post('/create-brands')
  async GreateBrands (
    @Body() body:any,
    @Req() req:any
  ){
let data=this.brandService.CreateBrand(body,req.user)
return data
  }
   @UseGuards(AuthGuardGuard)
@Put('/updateBrand/:BrandId')
  async updateBrand(
    @Body() body:any,
    @Param() param:any

  ){
    let data=await this.brandService.UpdateBrands(body,param.BrandId)
    return data
  }
  @Delete('/Deletebrand/:BrandId')
  async DeleteBrand(
    @Param() param:any

  ){
    let data=await this.brandService.Deletedbrand(param.BrandId)
    return data
  }

}
