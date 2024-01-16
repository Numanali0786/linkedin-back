import mongoose from 'mongoose';

const requetSchema = new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserProfile'
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserProfile'
    },

    createdAt:{
        type:Date,
        default: Date.now()
    }
})


export const FriendRequest = new mongoose.model('FriendRequest',requetSchema)