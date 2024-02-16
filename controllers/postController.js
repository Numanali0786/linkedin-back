import UserPost from "../schema/postSchema.js"

export const getPosts = async (req, res) => {

    console.log('posts')

    try {


        const posts = await UserPost.find({}).populate('author')

        // console.log(posts)
        res.status(200).json(posts.reverse())

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}

export const createPosts = async (req, res) => {
    const newPost = req.body


    try {
        const post = await (await UserPost.create(newPost)).populate('author')
        res.status(200).json(post)

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}
export const deletePost = async (req, res) => {
    const {id} = req.params
console.log(id)

    try {
        const post = await UserPost.findByIdAndDelete(id)
        res.status(200).json(post)

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}