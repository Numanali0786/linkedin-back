import UserProfile from "../schema/profileSchema.js"

export const getProfile= async(req,res)=>{

    
    try {
        console.log('hh')
        const profile = await UserProfile.find({})
       
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}
export const deleteProfile= async(req,res)=>{
    const {id} = req.params
    
    try {
        console.log('hh')
        const profile = await UserProfile.findOneAndDelete({_id:id})
       
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createProfile= async(req,res)=>{
    const newPost = req.body
    
    
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
    const {id} = req.params
    console.log(newProfile)
    
    
    try {
        const profile = await UserProfile.findOneAndUpdate({_id:id},newProfile,{new:true})
        // console.log(profile)
        res.status(200).json(profile)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}