import express from 'express';
import * as userService from './user.service.js'
import {authMiddleware} from '../../middlewares/index.js'
const authenticate = authMiddleware.authenticate;

const userRouter = express();

userRouter.get('/info',authenticate,async(req,res,next)=>{

    const usrId = req.user.id
    console.log(usrId)
    const result = await userService.findUser(usrId);
    return res.status(200).json(result)
});

userRouter.patch('/update-profile',authenticate,async(req,res,next)=>{
    const usrId = req.user.id
    const body = req.body;
    const result = await userService.updateUser(usrId,body);
    return res.status(200).json(result)
});


userRouter.delete('/soft-delete',authenticate,async(req,res,next)=>{
    const usrId= req.user.id
    const result = await userService.softDeleteUser(usrId)
    return res.status(201).json({message:"Deleted Account", result})
})

userRouter.patch('/restore-account',authenticate,async (req,res,next)=>{
    const usrId = req.user.id;
    const result = await  userService.restoreDeletedUser(usrId);
    return res.status(201).json({message:"Restore Account Successfully ", result})
})

userRouter.delete('/delete-account',authenticate,async(req,res,next)=>{
    const usrId= req.user.id
    const result = await userService.hardDeleteAccount(usrId)
    return res.status(201).json({message:"Deleted Account Successfully", result})
})

userRouter.get('/user-messages',authenticate,async(req,res,next)=>{
    const usrId = req.user.id
    const result = await userService.getUserWithMessages(usrId);
    return res.status(200).json(result)
})
export default userRouter