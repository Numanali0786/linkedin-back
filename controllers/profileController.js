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
        console.log('hh')
        const profile = await UserProfile.findOneAndDelete({authorSub})
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createProfile= async(req,res)=>{
    const newPost = req.body
    console.log(newPost)
    
    
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
    console.log(newProfile,authorSub)
    
    
    try {
        const profile = await UserProfile.findOneAndUpdate({authorSub},newProfile,{new:true})
        // console.log(profile)
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}