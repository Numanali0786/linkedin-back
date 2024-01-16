import express from 'express';
import { getProfiles,getProfile,createProfile, updateProfile,deleteProfile, getUsers, getFriends, getRequests, getSentRequests } from '../controllers/profileController.js';

const profileRouter = express.Router()

profileRouter.get('/',getProfiles)
profileRouter.get('/:authorSub',getProfile)
profileRouter.post('/',createProfile)
profileRouter.patch('/:authorSub',updateProfile)
profileRouter.delete('/:id',deleteProfile)

profileRouter.get('/get-users/:id',getUsers)
profileRouter.get('/get-friends/:id',getFriends)
profileRouter.get('/get-friend-requests/:id',getRequests)
profileRouter.get('/get-sent-requests/:id',getSentRequests)


export default profileRouter