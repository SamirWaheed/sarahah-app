import { redis } from "./env.config.js";

export const redisConfig = {
    redisUrl :redis.url,
    redisPort : redis.port,
    redisUsername:redis.username,
    redisPassword: redis.password
}
