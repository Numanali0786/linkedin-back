import express from 'express';
import { getPosts,createPosts, deletePost } from '../controllers/postController.js';

const postRouter = express.Router()

postRouter.get('/',getPosts)
postRouter.post('/',createPosts)
postRouter.delete('/:id',deletePost)


export default postRouter