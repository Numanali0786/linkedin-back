import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({


    author: {
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    }
    ,

    commentText: String,
    createdAt: { type: Date, required: true, default: Date.now },
    likeCount: {
        type: Number,
        default: 0
    },
    authorEmail: {
        type: String,
        required: true

    },
    postId: {
        type: String,
        required: true

    }

})

const PostComment = mongoose.model('PostComment', CommentSchema)
export default PostComment