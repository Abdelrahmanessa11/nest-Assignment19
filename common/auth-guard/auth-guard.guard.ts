import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.service.js';
@Injectable()
export class AuthGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ) {
    const request=context.switchToHttp().getRequest<Request&{user?:JwtPayload | string}>();
    const [flag,token]=request.headers.authorization?.split(' ') ||[]
    if(flag == 'Basic'){
      const basicData= Buffer.from(token,"base64").toString()
      let [email,password]=basicData.split('')
    }
    if(flag !='Bearer'){
      throw new BadRequestException('invalid token')
    }
    try {
      const decoded =jwt.decode(token) as JwtPayload 
      let signature
      switch(decoded.aud){
case "User":
signature=env.usersignture
break;
case"Admin":
signature=env.adminsignture
 break;
 default:
  throw new BadRequestException('invalid token')
  
      }
      const decodedData=jwt.verify(token ,signature) as JwtPayload
       if(!decodedData.id){
       throw new BadRequestException('invalid token')
      }
      request.user=decodedData
     
    } catch (error) {
      throw new BadRequestException({
        message:error,
        cause:{
          extra:{
            extra:error
          }
        }
      })
    }
    return true;
  }
}
