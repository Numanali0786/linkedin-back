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
    position: String,
    postText: String,
    selectedFile: String, 
    createdAt:{ type: Date, required: true, default: Date.now },
    likeCount: {
        type: Number,
        default: 0
    },  
    authorSub:{
        type:String,  
        required:true
    }

})

const UserPost = mongoose.model('UserPost', PostSchema)
export default UserPost