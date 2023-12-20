import UserPost from "../schema/postSchema.js"

export const getPosts= async(req,res)=>{

    
    try {
        const posts = (await UserPost.find({})).reverse()
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createPosts= async(req,res)=>{
    const newPost = req.body

    
    try {
        const post = await UserPost.create(newPost)
        res.status(200).json(post)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}