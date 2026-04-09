import express from "express"
import * as messageService from  './message.router.js'
import {authMiddleware} from '../../middlewares/index.js'

const messageRouter = express();
const authenticate = authMiddleware.authenticate;


messageRouter.post('/new-message',authenticate,async(req,res,next)=>{
    const userId = req.user.id
    const message  = await messageService.createMessage(req.body,userId);
    return res.status(201).json({Message:" Create message Successfully",message})
})



export default messageRouter