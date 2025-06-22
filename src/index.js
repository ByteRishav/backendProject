// // require('dotenv').config({path:'./env'}) // not best aproach to import dotenv
// import dotenv from "dotenv"
// // dotenv : is utility by npm in which env variable will be availabe to all





// // now the second need is to configure the dotenv
// dotenv.config({
//     path: './env'
// })
import {app} from "./app.js"
// import dotenv from "dotenv";
// dotenv.config();

// import connectDB from "./db/index.js"

// console.log("chalo")
// console.log("MongoDB URI:", process.env.MONGODB_URI);

// connectDB() // in this we have async function , FACT : async function give the promise back so we can handle than by using then statement
// .then(() => {
//     // now databese is connected so we came in then , now server has to listen over the some port using connected database

//     //let listen about the error if coming through server
//     app.on("error",(error) =>{
//         console.log("ERRR : ",error);
//         throw error;
//     })

//     // now listening of server on any port for frontend requestes and now server is with database connected
    
//     app.listen(process.env.PORT || 8000, () =>{
//         console.log(`@ Server is running at port : ${process.env.PORT}`);
//     })

// }) // now after than we can also use the catch statement for errors
// .catch((err) =>{
//     console.log("MONGO db connection failed !!!",err);
// })

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`@ Server is running at port : ${PORT}`);
});








// this is normal approach to make the connection with database
/*
import express from "express"
const app = express();

;(  // semi colon is taken when no semicolon was in previous line becouse sometime we get problem due to this
    async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("error",(error) => { // this is express listner for errors
                console.log("error: ",error);
                throw error
            })

            app.listen(process.env.PORT,() =>{
                console.log(`App is listening on port ${process.env.PORT}`)
            })
        } catch (error) {
            console.log(error);
            throw(error); 
        }
 })()
*/
