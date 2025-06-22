import multer from 'multer'

// multer give me to handle the file also coming from user



const storage = multer.diskStorage({
    destination: function (req,file,cb){   // req can contain json data , file : we access file also from user , cb : where to store
        cb(null,'./public/temp')    // callback takes the error and destination to store
        // null : dont wants to handle any error

    },

    filename : function  (req,file,cb){
        cb(null , file.originalname)  // null : error handling , orininal name: wants to store the file with the name given by user

    }

})

export const upload = multer({
    storage : storage,
})