import express from "express"
import * as authService from  './auth.service.js';
import {unifiedResponse,authMiddleware} from "../../middlewares/index.js";
import { auth } from "google-auth-library";

const {authenticate} = authMiddleware;
const authRouter = express();

authRouter.post('/signup',unifiedResponse(
    async(req,res)=>{
    
    const result = await authService.signUp(req.body);
    return ({message:"User Created Successfully", data:result, meta:{statusCode:201}})
}));

authRouter.post('/login',unifiedResponse(
    async(req,res)=>{
    const {tokens} = await authService.login(req.body);
    return ({message:"login Successfully", data:tokens,meta:{statusCode:200}})
}));

authRouter.post('/refresh',unifiedResponse(async(req,res,next)=>{
    
    const result = await authService.refreshToken(req.headers);
    return ({message:"Token Refreshed Successfully", data:result})
}));

authRouter.post("/gmail/register",unifiedResponse(async(req,res,next)=>{
    const result = await authService.gmailSignUp(req.body);
    return ({message:"User Created Successfully", data:result, meta:{statusCode:201}})
}));

authRouter.post("/gmail/login",unifiedResponse(async(req,res,next)=>{
    const result = await authService.gmailLogin(req.body);
    return ({message:"login Successfully", data:result})
}));

authRouter.post("/logout",authenticate,unifiedResponse(async(req,res,next)=>{
  
    const result = await authService.logout(req.user, req.headers.refreshtoken);
    return ({message:"Logout Successfully", data:result,meta:{statusCode:200}}) }));

authRouter.put("/verify-otp",unifiedResponse(async(req,res,next)=>{
    const result = await authService.verifyOtp(req.body)
    return ({message:"Email verified Successfully", data:result,meta:{statusCode:201}})
}))
authRouter.post("/resend-otp",unifiedResponse(async(req,res,next)=>{
    const result = await authService.resendOtp(req.body)
    return ({message:"OTP sent Successfully", data:result,meta:{statusCode:200}})
}))

export default authRouter