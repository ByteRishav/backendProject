import mongoose , {Schema} from "mongoose";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// JWT encodes user info into a secure token for stateless authentication.
// bcypt :   do the hashing of userpassword
 //      : through this new password can be compared by this library
 // this make the new password hast and compare the logined user password
 // hashing if ecryption which cant be decrypt 
 F

const userSchema = new Schema({
    userName :  {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
        index : true,
         
    },
    email :  {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
        //no need of email index , we will search the email manually
        // at anywhere with choice the idex is not use in prject
        // index is given by thinking first about need  
    },
    fullName :  {
        type : String,
        required : true,
        // unique : true,  // many user full name can be "rishav_sharma"
        // lowercase : true,
        trim : true, 
        index : true,
         
    },

    avatar : {
        type : String  , // becaouse url of image is coming from third partty  or "CLOUDINARY URL"
        required : true,

    },
    coverImage : {
        type : String
    },

    watchHistory : [
        // this will be an array of object
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password :{
        type : String,  // is string becaouse we are storing the encrypted form of password 
        // in database, becaouse db can hack so numeral password is bad practice
         required : [true , 'password is required']  ,  // custom message

    },

    refreshToken : {
        type : String
    }
},{
    timestamps:true
    // now i'll get the facility of updated at and created at

})



userSchema.pre("save",async function (next) {
// pre hook : it do the thing just before main thing to execute like : do encryption of paaswrod before saveing that  into db
// dont use array function here 
// async is taken becaouse during ecryption time can be taken  by algorithm
// next keyword is use becaouse pre is middleware of mongoose

// this keyword can access all things of userSchema
    

// pre is doing the hashing every time when anything modify in userSchema but we need it do hashing on changing the password\
// this.password = bcrypt.hash(this.password,10)
//     next()

// so if statement i am using : if not chaged than go for next
    if(!this.isModified("password")) return next();
// other wise : hashing\

          this.password = bcrypt.hash(this.password,10) // 10 if salt rounds just search for it
          next();



})

// pre , and many methods are give by mongoose
//we can also make the custom methods
// how lets dive ...
userSchema.methods.isPasswordCorrect = async function (password) {
     // how to check password
     // bccryt can also check
     return await bcrypt.compare(password,this.password)   // gives true or false
     // through keyword related to particular object we can accesas the exiting password in this object with new password
}
// in above code we are adding an function isPasswordCorrect like eg:

// const obj = {};
// obj.sayHello = function(name) {
//   console.log("Hello " + name);
// };

// // Now calling it
// obj.sayHello("Rishav");

// why we dont use arrow function here becaouse arrow function has not "this" keyword
// eg :-- 

// const user = {
//   name: "Rishav",
//   sayHello: function () {
//     console.log("Hello, my name is", this.name);
//   },
// };
// user.sayHello(); // ✅ this → user object → prints "Hello, my name is Rishav"
 
// now make access token in .env so that we dive into makin g of access keys for users
userSchema.methods.generateAccessToken = function(){
    // in this work in most of time no  need of async await is requred becouase it is fast process
    return jwt.sign(
        // now jwt.sign require first parameter is payload so give in object form
        {
            _id : this._id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
            // this.things are coming from database

        },
        // now second parameter sign needs is ... secret token

        process.env.ACCESS_TOKEN_SECRET,
        
        // third parameter : expiry of token    

        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
        return jwt.sign(
        // now jwt.sign require first parameter is payload so give in object form
        {
            _id : this._id,
            // refress token needs small knowledge , becaouse it refresh itself timely
            // or becaose it proves only you are logged in
            //' and access token takes more data because through we dive into protected data requests

        },
        // now second parameter sign needs is ... secret token

        process.env.REFRESH_TOKEN_SECRET,
        
        // third parameter : expiry of token    

        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema)
