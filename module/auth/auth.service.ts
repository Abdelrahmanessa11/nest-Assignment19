import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login()  {
    return { message: 'Login successful' };
  }
 register(body: any){
    return { message: 'Register successful',data:body };
 }
}

 