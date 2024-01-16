import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({


    name: {
        type: String,

    },
    selectedFile: String,
    position: String,
    createdAt: { type: Date, required: true, default: Date.now },
    profileViews: Number,
    postImpression: Number,
    authorSub: {
        type: String,

    },
    socket_id: {
        type: String
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserProfile"
        }
    ],
    status: {
        type: String,
        enum: ["Online", "Offline"]
    },

    gender: String,
    headline: String,
    country: String,
    city: String,
    contact: String,
    education: {
        university: String,
        location: String,
        to: String,
        from: String,
        stream: String
    },
    job: {
        company: String,
        location: String,
        to: String,
        from: String,
        role: String
    }


})

const UserProfile = mongoose.model('UserProfile', ProfileSchema)
export default UserProfile