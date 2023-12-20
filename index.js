import express from 'express';
import mongoose from 'mongoose';
import postRouter from './routes/postRoutes.js';
import cors from 'cors';
import commentRouter from './routes/commentRoute.js';
import profileRouter from './routes/profileRoute.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express()
app.use(cors())
app.use(express.json({ limit: '2MB' }))
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)
app.use('/api/profile',profileRouter)



mongoose.connect(process.env.CONNECTION__KEY).then(()=>{

    app.listen(process.env.PORT,()=> console.log('at 5000'))
}).catch((error)=> console.log(error))

