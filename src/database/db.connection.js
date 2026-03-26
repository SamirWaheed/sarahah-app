import mongoose from "mongoose";
import { dbConfig } from "../config/env.config.js";
const dbUrI = dbConfig.MONGO_URI;

async function connectDB (){
    try {
        const conn = await mongoose.connect(dbUrI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {

         console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}
export default connectDB;