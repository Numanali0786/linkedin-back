import express from 'express';
import { getComments,createComments } from '../controllers/commentController.js';

const commentRouter = express.Router()

commentRouter.get('/',getComments)
commentRouter.post('/',createComments)


export default commentRouter