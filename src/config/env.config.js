import dotenv from 'dotenv';

dotenv.config({
    path: `.${process.env.NODE_ENV}.env`
});
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
        
        refreshSignature: process.env.REFRESH_TOKEN_SECRET_USER,
        refreshExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME_USER
    },
    admin: {
        accessSignature: process.env.ACCESS_TOKEN_SECRET_ADMIN,
        refreshSignature: process.env.REFRESH_TOKEN_SECRET_ADMIN,
        accessExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME_ADMIN,
        refreshExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME_ADMIN,

    }
}