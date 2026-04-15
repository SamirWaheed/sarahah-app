import express from "express"
import * as authService from  './auth.service.js';


const authRouter = express();

authRouter.post('/signup',async(req,res,next)=>{
    console.log(req)
    const result = await authService.signUp(req.body);
    return res.status(201).json(result)
});

authRouter.post('/login',async(req,res,next)=>{
    const {accessToken, refreshToken, user} = await authService.login(req.body);
    return res.status(200).json({message:"login Successfully", token: accessToken, refreshToken, user})
});

authRouter.post('/refresh',async(req,res,next)=>{
    
    const result = await authService.refreshToken(req.headers);
    return res.status(200).json(result)
});



export default authRouter