import express from 'express'

import {appConfig} from './src/config/env.config.js'
import {errorHandler} from './src/middlewares/index.js';
import connectDB from './src/database/db.connection.js';
import {authRouter,userRouter,messageRouter} from './src/modules/index.js';

const port = appConfig.port;

export default function bootstrap(app) {

    connectDB()
    app.use (express.json());

    app.use ('/auth',  authRouter)
    app.use ('/users', userRouter)
    app.use ('/messages', messageRouter)


    app.use (errorHandler)
    
    app.listen(port, () => {
        console.log("Server Running", port);
    })
}