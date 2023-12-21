import express from 'express';
import { getProfiles,getProfile,createProfile, updateProfile,deleteProfile } from '../controllers/profileController.js';

const profileRouter = express.Router()

profileRouter.get('/',getProfiles)
profileRouter.get('/:authorSub',getProfile)
profileRouter.post('/',createProfile)
profileRouter.patch('/:authorSub',updateProfile)
profileRouter.delete('/:id',deleteProfile)


export default profileRouter