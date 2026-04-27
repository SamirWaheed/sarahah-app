
import express from 'express';
import cors from 'cors'

import {appConfig,corsOptions} from './src/config/index.js';

import connectDB from './src/database/db.connection.js';
import {redisConnection} from './src/utils/utils.index.js';

import {errorHandler} from './src/middlewares/index.js';

import {authRouter,userRouter,messageRouter} from './src/modules/index.js';

const port = appConfig.port;

export default function bootstrap(app) {

    connectDB();
    redisConnection()

    // app.use (cors(corsOptions));
    
    app.use (express.json());
    
    app.use ('/api/auth',authRouter)
    app.use ('/users', userRouter)
    app.use ('/messages', messageRouter)

    app.use (errorHandler)
    
    app.listen(port, () => {
        console.log("Server Running", port);
    })
}