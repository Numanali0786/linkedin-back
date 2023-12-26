import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({



    postText: String,
    selectedFile: String, 
    createdAt:{ type: Date, required: true, default: Date.now },
    likeCount: {
        type: Number,
        default: 0
    },  
    author:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'UserProfile',
        
    }

})

const UserPost = mongoose.model('UserPost', PostSchema)
export default UserPost

