import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({


    author:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    postText: String,
    selectedFile: String, 
    createdAt:{ type: Date, required: true, default: Date.now },
    likeCount: {
        type: Number,
        default: 0
    },  
    authorEmail:{
        type:String,  
        required:true
    }

})

const UserPost = mongoose.model('UserPost', PostSchema)
export default UserPost