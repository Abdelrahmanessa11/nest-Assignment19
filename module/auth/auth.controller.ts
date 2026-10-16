import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Req, UseInterceptors } from "@nestjs/common";
import { get } from "https";
import { AuthService } from "./auth.service.js";
import { CustomValidationPipe } from "../../common/pipes/custom.validation.pipe.js";
import { registerSchema } from "./auth.validation.js";
import { LoggingInterceptor } from "../../logging/logging.interceptor.js";

@Controller()
@UseInterceptors(LoggingInterceptor)

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get('auth/login')

    login() {
   let data = this.authService.login();
   return data;
    }
@HttpCode(HttpStatus.CREATED)
    @Post('auth/register')
    register(
@Body(new CustomValidationPipe(registerSchema)) body: any,  

){
        let data=this.authService.register(body);
        return data;
    }
}
    