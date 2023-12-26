import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({


   
    commentText: String,
    createdAt: { type: Date, required: true, default: Date.now },
    likeCount: {
        type: Number,
        default: 0
    },
  
    authorPost:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'UserPost',
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'UserProfile',
        
    }

})

const PostComment = mongoose.model('PostComment', CommentSchema)
export default PostComment