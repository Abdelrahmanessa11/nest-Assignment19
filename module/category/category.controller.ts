import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { AuthGuardGuard } from '../../common/auth-guard/auth-guard.guard.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
    @Get('/get-all-categories')
   async  GetAllCategories(){
      let data=await this.categoryService.GetAllCategories()
      return data
    }
       @UseGuards(AuthGuardGuard)
  
    @Post('/create-categories')
    async CreateCategories (
      @Body() body:any,
      @Req() req:any
    ){
  let data=this.categoryService.CreateCategory(body,req.user)
  return data
    }
     @UseGuards(AuthGuardGuard)
  @Put('/updateCategory/:CategoryId')
    async updateCategory(
      @Body() body:any,
      @Param() param:any
  
    ){
      let data=await this.categoryService.UpdateCategories(body,param.CategoryId)
      return data
    }
    @Delete('/Deletecategory/:CategoryId')
    async DeleteCategory(
      @Param() param:any
  
    ){
      let data=await this.categoryService.DeleteCategory(param.CategoryId)
      return data
    }
}
