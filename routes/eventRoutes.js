import express from 'express';
import { getEvents,createEvent, deleteEvent } from '../controllers/eventController.js';

const eventRouter = express.Router()

eventRouter.get('/',getEvents)
eventRouter.post('/',createEvent)
eventRouter.delete('/:id',deleteEvent)


export default eventRouter