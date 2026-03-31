import { jwtMethods } from "../utils/utils.index.js";


export const authenticate = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    console.log(authHeader)
     if(!authHeader){
        throw new Error ("Token required",{cause:{status:401}});
    }
    const token = authHeader.split(" ")[1];
    
    console.log(token)
    if(!token){
        throw new Error ("Invalid Or Expired Token",{cause:{status:401}});
    }

    const decoded = jwtMethods.verifyToken(token);
    req.user = decoded 
    next()
}