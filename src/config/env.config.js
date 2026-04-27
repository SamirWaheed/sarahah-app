import dotenv from 'dotenv';

dotenv.config({
    path: `.${process.env.NODE_ENV}.env`
});

import ms from "ms";

const toSeconds = (val) =>{
    
    return ms(val) / 1000};
export const appConfig = {
    port: process.env.PORT ?? 3000,

    env: process.env.NODE_ENV ?? "env",
}
export const dbConfig = {
    MONGO_URI: process.env.MONGO_URI
}
export const encryption = {
    ENCRYPTION_KEY: process.env.ENC_KEY,
    IV_LENGTH: process.env.ENC_IV_LENGTH
}

export const jwtConfig = {
    user: {
        accessSignature: process.env.ACCESS_TOKEN_SECRET_USER,
        accessExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME_USER,

        accessExpirationTimeSec:toSeconds( process.env.ACCESS_TOKEN_EXPIRATION_TIME_USER),
        
        refreshSignature: process.env.REFRESH_TOKEN_SECRET_USER,
        refreshExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME_USER,

        refreshExpirationTimeSec:toSeconds(process.env.REFRESH_TOKEN_EXPIRATION_TIME_USER),
    },
    admin: {
        accessSignature: process.env.ACCESS_TOKEN_SECRET_ADMIN,
        refreshSignature: process.env.REFRESH_TOKEN_SECRET_ADMIN,
      
        accessExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME_ADMIN,
        accessExpirationTimeSec:toSeconds( process.env.ACCESS_TOKEN_EXPIRATION_TIME_ADMIN),

        refreshExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME_ADMIN,
        refreshExpirationTimeSec:toSeconds(process.env.REFRESH_TOKEN_EXPIRATION_TIME_ADMIN),
    }
}
export const corsConfig = {
    whiteList: process.env.CORS_WHITELIST.split(",")||[]
}

export const gcpConfig = {
    webClientId: process.env.GCP_WEB_CLIENT_ID 
}
export const redis ={
    url : process.env.REDIS_URL || "redis://localhost:6379",
    port : process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USERNAME ?? 'default',
    password :process.env.REDIS_PASSWORD,
    
}
