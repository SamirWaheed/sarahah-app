import { createClient } from "redis";
import { redisConfig } from "../../config/index.js";

console.log("Redis URL:", redisConfig.redisUrl);
export const redisClient = createClient({
    username:redisConfig.redisUsername,
    password:redisConfig.redisPassword,
    socket: {
        host: redisConfig.redisUrl,
        port: redisConfig.redisPort,
    }
    
});
export const redisConnection = async()=>{

    try {
        await redisClient.connect();
        console.log("Redis 100 100")
    } catch (error) {
        console.log("Redis Mesh Tmam ",error)
    }

}