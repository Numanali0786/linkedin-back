import { FriendRequest } from "../schema/friendRequest.js"
import UserProfile from "../schema/profileSchema.js"

export const getProfiles= async(req,res)=>{

    
    try {
        // console.log('hh')
        const profile = await UserProfile.find({})
       
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const getProfile= async(req,res)=>{
    const {authorSub} = req.params
    // console.log(authorSub)

    try {
        // console.log('hh')
        const profile = await UserProfile.findOne({authorSub})
    //console.log(profile)
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}
export const deleteProfile= async(req,res)=>{
    const {authorSub} = req.params
    
    try {
        // console.log('hh')
        const profile = await UserProfile.findOneAndDelete({authorSub})
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createProfile= async(req,res)=>{
    const newPost = req.body
    console.log('create',newPost)
    
    
    try {
        const profile = await UserProfile.create(newPost)
        
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}
export const updateProfile= async(req,res)=>{
    console.log('update')
    const newProfile = req.body
    const {authorSub} = req.params
    // console.log(newProfile,authorSub)
    
    
    try {
        const profile = await UserProfile.findOneAndUpdate({authorSub},newProfile,{new:true})
        // console.log(profile)
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}


export const getUsers = async(req,res)=>{
    const {id} = req.params
    const all_users = await UserProfile.find({}).select("name _id selectedFile position")

    const this_user = await UserProfile.findById(id)

    const remaining_users = all_users.filter((user) => !this_user.friends.includes(user._id) && this_user._id.toString() !== user._id.toString())

    res.status(200).json(remaining_users)
}

export const getFriends = async(req,res)=>{
    const {id} = req.params
    const this_user = await UserProfile.findById(id).populate('friends','_id name selectedFile position')
    res.status(200).json(this_user.friends)
}
export const getRequests = async(req,res)=>{
    const {id} = req.params
    const requests = await FriendRequest.find({recipient:id}).populate('sender','_id name selectedFile position')
    res.status(200).json(requests)
}
export const getSentRequests = async(req,res)=>{
    const {id} = req.params
    const requests = await FriendRequest.find({sender:id}).populate('recipient','_id name selectedFile position')
    res.status(200).json(requests)
}