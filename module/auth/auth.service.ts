import { ConflictException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Tokenservices } from '../../common/services/token.servies.js';
import { User, userModel } from '../../database/user.model.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareHash, generateHash } from '../../common/bycrpt/comparepassword.js';
import { env } from '../../config/env.service.js';
import { redisServices } from './../../common/services/redis services/redis.services.js';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenservices: Tokenservices,
    private readonly redisServices:redisServices,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
  }
  async login(data: any) {
    let { email, password } = data;
    let emaildata = await this.userModel.findOne({ email })

    if (!emaildata) {
      throw new NotFoundException("the email not found")
    }
    if (emaildata) {
      let comparedpass = await compareHash({ plaintext: password, cypertext: emaildata.password })
      if (!comparedpass) {
        throw new BadRequestException('password error '
        )

      }
      let token = await this.tokenservices.generateToken( emaildata
      );
      return { message: 'user logged in successfully', data: token };
    }
  }
  async register(data: any) {
    let { name, email, password, phone } = data
    const existedemail = await this.userModel.findOne({ email })
    if (existedemail) {
      throw new ConflictException('user already exists')
    }
    const hashpassowrd = await generateHash({ plaintext: password })
    if (!hashpassowrd) {
      throw new BadRequestException("invalid password")
    }
    const otp = Math.floor(1000 + Math.random() * 9000)
    
    const userdata = await this.userModel.insertOne({ name, email, password: hashpassowrd, phone })
        await this.redisServices.set({
key:`otp::${userdata._id}`,
value:otp,
ttl:60

        })

    if (userdata)
      return {
        message: 'useraded', data: userdata
      }
  }
  async verify(data:any){
    let {email,otp}=data;
    let userData=await this.userModel.findOne({email})
    if(!userData){
      throw new NotFoundException("the email no found")
    }
    let redisotp=await this.redisServices.get(
      {
       key: `otp::${userData._id}`
      }
    )
    if(redisotp!=otp){
throw new BadRequestException('invalid otp')
    }
    userData.isverified=true
    await userData.save()
    return ({message :'user is verifyed'})
  }
}

