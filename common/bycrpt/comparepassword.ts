import bycrpt from 'bcrypt';
import { env } from '../../config/env.service.js';

export const generateHash=async({plaintext,salt=env.salt}:{
    plaintext:string,
    salt?:string
}):Promise<string >=>{
return await bycrpt.hash(plaintext,Number(salt))
}

export const compareHash=async({plaintext,cypertext}:{
    plaintext:string,
    cypertext:string
}):Promise<boolean>=>{
return await bycrpt.compare(plaintext,cypertext)
}