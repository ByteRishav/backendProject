// for file system design we have one story : 
// first we get the file on server form frontend
// 1. save the file on server(local storage)  temporaly 
/// 2 . take the file from server and upload on cloudinary
// 3. now remove the file from server
// adv. of tempory : so that reupload option can be provided



import { v2 as cloudinary } from 'cloudinary'

import fs from "fs"  // this is not to install , its is with node
// it is use to operation with file like : read , write , etc
 

cloudinary.config({ 
    // the all this is sensitive so use env file
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath ,{
            // here we can give more info to cloudinary during uploading the file
            // like resource type : image or raw  or video , simply just take auto 
            resource_type :'auto'
        } )
        // file has been uploaded succesfully
        console.log("file is uploaded on cloudinary",response.url);
        return response;

        } catch (error) {
          // here we got the url
          // catch case : not uploaded 
          fs.unlinkSync(localFilePath)
          // here unlinksync : remove the locally saved temporary file as the upload
          //                   operation got failed
          // sync : hona hi chahiye than move forward
          return null;
        
    }

}



export {uploadOnCloudinary}


