import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

// cors : an sequirty utility by browser to alllow the desired frontend for requests   
app.use(cors({

    origin : process.env.CORS_ORIGIN, // i am allowing to cors_origin in env file to request me on server port
    // there is many things to allow 
    // like credentials : research over it on chatgpt
    credential : true
}))


// for configrateion,set middlewares 
app.use(express.json({limit : "16kb"})) // here we are taking the data "if data comes in "form" form"



// now i have to set new configuration that how to handle the data coming through "URL" 
app.use(express.urlencoded({extended : true , limit: "16kb"}))
// urlencoded : if we write in google rishav sharma than in url it will in another form like have % and other + sign in that
// so to handle that all we are using urlencoded here


// now sometime we will get file(pdf ,image) or folders so set the static 
app.use(express.static("public")) // public is an folder where i will store the files in server

// now we have to get the cookies from userbrowser than we will use cookieparser
//     we have to set some cookies in userbrowser in sequre way so than only server can read and write and remove that , than use cookieparser
app.use(cookieParser())




// routes import
import userRouter from "./routes/user.routes.js";


// router declaration
app.use("/api/v1/users", userRouter)

export {app}
// its upon me to how export named or default;

  