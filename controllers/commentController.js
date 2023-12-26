import PostComment from "../schema/commentSchema.js"

export const getComments= async(req,res)=>{

    
    try {
        const posts = await PostComment.find({}).populate('authorPost').populate('author')
        // const posts = await(await(await PostComment.find({})).populate('authorPost')).populate('author')
        res.status(200).json(posts.reverse())
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}

export const createComments= async(req,res)=>{
    const newPost = req.body
    console.log(newPost)

    
    try {
        const post = await(await (await PostComment.create(newPost)).populate('authorPost')).populate('author')
        res.status(200).json(post)
        
    } catch (error) {
        res.status(400).json({'message':error.message})
    }
}