import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    selectedFile: String, 
    position: String,
    createdAt:{ type: Date, required: true, default: Date.now },
    profileViews: Number,
    postImpression:Number,
    authorEmail:String

})

const UserProfile = mongoose.model('UserProfile', ProfileSchema)
export default UserProfile