import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";
import { Tokenservices } from "../../common/services/token.servies.js";
import { AuthService } from "./auth.service.js";
import { redisServices } from "../../common/services/redis services/redis.services.js";
import { userModel } from "../../database/user.model.js";
@Module({
    controllers: [AuthController],
    providers: [AuthController,AuthService,Tokenservices,redisServices],
    imports:[userModel]
})
export class AuthModule {}