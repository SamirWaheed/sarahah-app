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

export default userRouter