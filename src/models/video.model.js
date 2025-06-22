import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

// mogoseaggregatepaginate : like a plugin or a  middleware
// aggregate : calculate, set of table like things
// paginate : chuncks of large set
// Lets you do something like:
// eg :
// “Give me page 2 of products grouped by category, with 10 results per page”
//             aggregation                              paggination

// Without this plugin, doing pagination inside aggregation is hard manually.
 
const videoSchema = new Schema(
    {

        videoFile : {
            type : String , // cloudinary url
            required : true
        },
        thumbnail : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        duration : {
            type : Number,  // cloudinary will say about this duration
            required : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean ,  // viedo should see or not
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }   
        

    },{
        timestamps : true
    }
)


/// to make plugin active we have to do :
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)