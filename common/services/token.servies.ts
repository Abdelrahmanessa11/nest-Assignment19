import { BadRequestException, Injectable } from "@nestjs/common"
import { env } from "../../config/env.service.js"
import jwt, { JwtPayload } from "jsonwebtoken"
@Injectable()  
export class Tokenservices {
        

        constructor(){}

     generateToken(user:any){
    let signature=undefined
    let audience=undefined
    let refreshsignature=undefined

    switch (user.role) {
        case "0":
            
        signature=env.adminsignture
        audience="Admin"
        refreshsignature=env.refreshAdmin
            break;

        default:
                signature=env.usersignture
        audience="User"
        refreshsignature=env.refreshUser
            break;
    }

    let accessToken=jwt.sign({id:user._id},signature as string,{audience,expiresIn:"30min"})
    let refreshtoken=jwt.sign({id:user._id},refreshsignature as string,{audience,expiresIn:"1y"})
console.log("accessToken1",accessToken)
console.log("refreshtoken",refreshtoken)
    return{accessToken,refreshtoken}
        }


    decodedtoken(token:string){
        let decoded =jwt.decode(token) as JwtPayload
        if(!decoded){
            throw new BadRequestException("the token is not valid")
        }
        let signature=undefined
        switch (decoded.aud) {
            case "Admin":
                signature=env.adminsignture
                break;
        
            default:
                signature=env.usersignture
                break;
        }
        let decodeddata=jwt.verify(token,signature as string)
        return decodeddata
    } 

        decodedrefreshtoken(refreshtoken:string){
        let decoded =jwt.decode(refreshtoken) as JwtPayload
        if(!decoded){
            throw new BadRequestException("the token is not valid")
        }
        let signature=undefined
        switch (decoded.aud) {
            case "Admin":
                signature=env.refreshAdmin
                break;
        
            default:
                signature=env.refreshUser
                break;
        }
        let decodeddata=jwt.verify(refreshtoken,signature as string)
        return decodeddata
    } 
    }