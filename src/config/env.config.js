import dotenv from 'dotenv';

dotenv.config({path :`.${process.env.NODE_ENV}.env`});
export const appConfig = {
    port : process.env.PORT ?? 3000,
  
    env : process.env.NODE_ENV ?? "env",
}
 export const dbConfig = {
    MONGO_URI : process.env.MONGO_URI 
}
export const encryption ={
    ENCRYPTION_KEY : process.env.ENC_KEY,
    IV_LENGTH : process.env.ENC_IV_LENGTH
}

export const authN = {
    AUTH_KEY :process.env.TOKEN_SECRET
}