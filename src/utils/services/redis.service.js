
import {
    redisClient
} from "../clients/index.clients.js";

export const stringServices = {

    setKey: async ({key, value, options = {}}) => {
        return redisClient.set(key, value, options)},
    getKey:async ({ key}) => {
        return redisClient.GET(key) },

    expire: ({key,seconds}) => {
        return redisClient.expire(key, seconds)
    },
    deleteKey: ({key}) => {
        return redisClient.del(key)
    },
    ttlInfo: ({key})=>{
        return redisClient.ttl(key)
    },
    getAllKeys: ()=>{
        return redisClient.keys("*")
    }
}

export const hashServices = {
    addHash: ({key,value,options= {}})=>{
        return redisClient.hSet(key, value, options)
    },
    getHash: ({key, field})=>{
        return redisClient.hGet(key, field)
    },
    deleteHash: ({key, field})=>{
        return redisClient.hDel(key, field)
    },
    getAllHash: ({key})=>{
        return redisClient.hGetAll(key)
    },

}

const tokenTtl= (exp)=>{
    const currentTime = Math.floor(Date.now() / 1000);
    return exp - currentTime
}
export const blacklistTokens = (token,exp)=>{

    const ttl = tokenTtl(exp);

   if (!ttl || ttl <= 0 || isNaN(ttl)) return;

    return  stringServices.setKey({
        key:token,
        value: "blacklisted",
        options: {
            EX: ttl
        }
    })

}















