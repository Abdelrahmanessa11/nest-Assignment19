import dotenv from 'dotenv';
dotenv.config({ path: ['.env.dev', '.env.prod'] });

export const env={
    get port(){
        return process.env.PORT || 3000;
    },
    get databaseUrl(){
        return process.env.DATABASE_URL 
    },
    get usersignture(){
        return process.env.USERSIGNTURE  as string;
    },
    get adminsignture(){
        return process.env.ADMINSIGNTURE as string;
    },
    get refreshUser(){
        return process.env.REFRESHUSERSIGNTURE as string;
    },   
    get refreshAdmin(){
        return process.env.REFRISHADMINSIGNTURE as string; 
    },
    get salt (){
        return process.env.SALT;
    },
    get redisUrl(){
        return process.env.REDIS_URL;
    }

}