import express from 'express';
import { getProfile,createProfile, updateProfile,deleteProfile } from '../controllers/profileController.js';

const profileRouter = express.Router()

profileRouter.get('/',getProfile)
profileRouter.post('/',createProfile)
profileRouter.patch('/:id',updateProfile)
profileRouter.delete('/:id',deleteProfile)


export default profileRouter