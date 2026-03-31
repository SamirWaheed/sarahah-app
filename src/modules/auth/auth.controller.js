import express from "express"
import * as authService from  './auth.service.js';
import { authMiddleware } from "../../middlewares/index.js"; 

const authRouter = express();

authRouter.post('/signup',async(req,res,next)=>{
    const result = await authService.signUp(req.body);
    return res.status(201).json(result)
});

authRouter.post('/login',async(req,res,next)=>{


    const result = await authService.login(req.body);
    return res.status(200).json({message:"login Successfully",token:result.token,user: result.user})
});



export default authRouter