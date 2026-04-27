import {
    jwtMethods,
    Token_Type
} from "../utils/utils.index.js";


export const authenticate = async (req, res, next) => {

    const authHeader = req.headers.authorization;
   

    if (!authHeader) {
        throw new Error({message:"Token required",statusCode: 401});
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Invalid Or Expired Token",{cause:{statusCode:401}});
    }
   
    
    const {decodedData} = await jwtMethods.authenticateToken(token,Token_Type.Access);
    req.user =decodedData;
    next()
}

export const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
           
             throw new Error("Unauthorized Access",{cause:{statusCode:403}})
        }
        next()
    }
}