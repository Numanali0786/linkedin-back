import express from 'express';
import { getPosts,createPosts } from '../controllers/postController.js';

const postRouter = express.Router()

postRouter.get('/',getPosts)
postRouter.post('/',createPosts)


export default postRouter