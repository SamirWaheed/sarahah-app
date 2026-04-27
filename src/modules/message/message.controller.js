import express from "express"
import * as messageService from  './message.router.js'
import {authMiddleware,unifiedResponse} from '../../middlewares/index.js'

const messageRouter = express();
const authenticate = authMiddleware.authenticate;


messageRouter.post('/new-message',authenticate,unifiedResponse(async(req,res,next)=>{
    const userId = req.user.id
    const message  = await messageService.createMessage(req.body,userId);
    return ({Message:" Create message Successfully",data:message,meta:{statusCode:201}})
   
}))

export default messageRouter