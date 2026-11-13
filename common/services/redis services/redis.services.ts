
import { createClient, RedisClientType } from 'redis';
import { Types } from 'mongoose';
import { env } from '../../../config/env.service.js';
import { Injectable } from '@nestjs/common';
import { OnModuleDestroy,OnModuleInit } from '@nestjs/common';

@Injectable()
export class redisServices implements OnModuleDestroy, OnModuleInit {

private client: RedisClientType
    constructor() {
        this.client= createClient({
            url:env.redisUrl as string
        })
        this.handleconnection()
    }


    handleconnection=async()=>{

        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.client.on('connect', () => console.log('Redis Client Connected'));
    }

    // connection=async()=>{
    //     await this.client.connect()
    // }
    async onModuleInit() {
  try {
    await this.client.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection failed:', error);
    throw error;
  }
}

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }
 createRevokeToken=({id,token}:{
    id:Types.ObjectId,
    token:string
 }):string=>{
    return `revoketoken::${id}::${token}`
}
 set =async ({key,value,ttl}:{key:string,value:any,ttl:number})=>{
    if(typeof value == 'object') {
        value = JSON.stringify(value)
    }
    return ttl?  await this.client.set(key,value,{EX:ttl}) : await this.client.set(key,value)

}
get =async ({key}:{key:string})=>{
    return await this.client.get(key)
}
 ttl =async ({key}:{key:string})=>{
    return await this.client.ttl(key)
}
 del_redis =async ({key}:{key:string})=>{
    return await this.client.del(key)
}
 exists =async ({key}:{key:string})=>{
    return await this.client.exists(key)
}
 mget =async (...keys:string[])=>{
    return await this.client.mGet(keys)
}

key(userId:Types.ObjectId){
    return `user:socket:${userId}`
}
async addSocket(userId:Types.ObjectId,SocketId:string){
    return await this.client.sAdd(this.key(userId),SocketId)
}
async removeSocket(userId:Types.ObjectId,SocketId:string){
    return await this.client.sRem(this.key(userId),SocketId)
}
async getSokcets(userId:Types.ObjectId){
    return await this.client.sMembers(this.key(userId))
}
async hasSocket(userId:Types.ObjectId){
    return await this.client.sCard(this.key(userId))
}
async removeUser(userId:Types.ObjectId){
    return await this.client.del(this.key(userId))
}
}