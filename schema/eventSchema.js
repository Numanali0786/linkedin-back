import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({



    name: String,
    description:String,
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

const UserEvent = mongoose.model('UserEvent', EventSchema)
export default UserEvent

