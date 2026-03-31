import jwt from 'jsonwebtoken';
import { authN} from '../../config/env.config.js';
const secret = authN.AUTH_KEY 

export const generateToken = (payload)=>{

    return jwt.sign(payload,secret,{expiresIn:`${1}hour`})
} 

export const verifyToken = (token) =>{
     return jwt.verify(token,secret)
}