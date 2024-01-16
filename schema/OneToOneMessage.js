import mongoose from 'mongoose';


const oneToOneMessage = new mongoose.Schema({

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    }],
    messages: [{
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserProfile'
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserProfile'
        },
        type: {
            type: String,
            enum: ["Text", "Media", "Document", "Link"]
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        text: {
            type: String
        },
        file: {
            typr: String
        },

    }]


})

export const OneToOneMessage = new mongoose.model('OneToOneMessage', oneToOneMessage)