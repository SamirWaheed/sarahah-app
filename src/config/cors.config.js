import { corsConfig } from "./env.config.js";
const {whiteList} = corsConfig;

console.log(whiteList)
export const corsOptions = {
    origin: function (origin, callback) {

        if (whiteList.includes(origin)||!origin) {
            callback(null, true),
                console.log("origin", origin)
        }   else {  
            callback(new Error("Not allowed by CORS"))
        }   
    }
}
