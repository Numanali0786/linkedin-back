import PostComment from "../schema/commentSchema.js"

export const getComments= async(req,res)=>{

    
    try {
        const posts = (await PostComment.find({})).reverse()
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createComments= async(req,res)=>{
    const newPost = req.body

    
    try {
        const post = await PostComment.create(newPost)
        res.status(200).json(post)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}