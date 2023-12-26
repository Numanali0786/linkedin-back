import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({


    name:{
        type:String,
        
    },
    selectedFile: String, 
    position: String,
    createdAt:{ type: Date, required: true, default: Date.now },
    profileViews: Number,
    postImpression:Number,
    authorSub:{
        type:String,
        
    }

})

const UserProfile = mongoose.model('UserProfile', ProfileSchema)
export default UserProfile