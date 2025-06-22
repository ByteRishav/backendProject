import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try {
        // basically mongoose returns me an object after connecting with database
        // so handle that object in any variable
        console.log("MongoDB URI :", `${process.env.MONGODB_URI}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error : ",error)
        // nodejs give me the access of process without the import 
        process.exit(1)
        // i have exited by code 1 (of every type exit there are specific code , check it out on chrome)
    }
}

export default connectDB