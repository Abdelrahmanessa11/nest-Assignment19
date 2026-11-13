import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { get } from "https";
import { AuthService } from "./auth.service.js";
import { CustomValidationPipe } from "../../common/pipes/custom.validation.pipe.js";
import { registerSchema } from "./auth.validation.js";
import { LoggingInterceptor } from "../../logging/logging.interceptor.js";
import { AuthGuardGuard } from "../../common/auth-guard/auth-guard.guard.js";
import { FileInterceptor } from "@nestjs/platform-express";
import { verify } from 'crypto';
@Controller()
@UseInterceptors(LoggingInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }
    @Get('auth/login')
    // @UseGuards(AuthGuardGuard)
    async login(
        @Body() body: any
    ) {
        let data = await this.authService.login(body);
        return data;
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('auth/register')
    @UseInterceptors(
        FileInterceptor(
            'image',
            {
                dest: './uploads',
                limits: {
                    fileSize: 5 * 1024 * 1024
                },
                fileFilter: (req, file, callback) => {
                    if (!file.mimetype.match(/^image\/(jpeg|png)/)) {

                        return callback(new UnsupportedMediaTypeException('only png and jpg accepted',), false)
                    }
                    callback(null, true)
                }

            },

        )
    )
    register(
        @Body(new CustomValidationPipe(registerSchema)) body: any,
        @UploadedFile() file: any

    ) {
        console.log(file);

        let data = this.authService.register(body);
        return data;
    }

  @Put('/veryfy')
 async  verify(@Body() body:any){
let data=await this.authService.verify(body)
return data
  }
}
