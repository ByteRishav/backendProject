import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
// in async we are havig 4 parameters when we are coding in express
const registerUser = asyncHandler(async(req,res) => {
    // 1. get user detail from frontend
    // 2. validation : anythings is empty or not like checker
    // 3. check if user already exists : username , email
    // 4. check for images , check for avatar
    // 5. upload them to cloudinary , avatar check also
    // 6. create user object - create entry in db ( mongo db take data in object form)
    // 7. remove password and refresh token field from response : beacouse after register we will get feedback and send to user that you are registred now
    // 8. check response in came or not that registered or not
    // 9. if created : return res otherwise error to frontend
    
    
    // 1. if data is coming by form or direct json than in res.body i can get that
    // but if url way : than we will resolve that later
    const {fullName,email,username , password} = req.body
    console.log("email : ",email)

    // 2 validation : anything is false or true
    if(
        [fullName, email , username , password].some((field) =>
          field?.trim() ==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    // 3 
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if( existedUser ){
         throw new ApiError(409 , "User with email or username already exists")
    }
    req
      
})

export {
    registerUser,
}