import express from "express"
import * as authService from  './auth.service.js';

const authRouter = express();

authRouter.post('/signup',async(req,res,next)=>{
    const result = await authService.signUp(req.body);
    return res.status(201).json(result)
});

authRouter.post('/login',async(req,res,next)=>{

    const result = await authService.login(req.body);
    return res.status(201).json("login Successfully",result)
});


authRouter.get('/info/:userId',async(req,res,next)=>{

    const result = await authService.findUser(req.params.userId);
    return res.status(200).json(result)
});
export default authRouter