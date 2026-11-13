import { Module } from "@nestjs/common";
import { redisServices } from "./redis.services.js";
@Module({
    providers:  [redisServices],
    exports: [redisServices]
})
export class RedisModule {}