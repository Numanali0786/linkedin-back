import UserEvent from "../schema/eventSchema.js"

export const getEvents = async (req, res) => {

    console.log('posts')

    try {


        const events = await UserEvent.find({}).populate('author')

        // console.log(events)
        res.status(200).json(events.reverse())

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}

export const createEvent= async (req, res) => {
    const newEvent = req.body


    try {
        const event = await (await UserEvent.create(newEvent)).populate('author')
        res.status(200).json(event)

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}

export const deleteEvent= async (req, res) => {
    console.log('de;lete')
    const {id} = req.params


    try {
        const event = await UserEvent.findByIdAndDelete(id)
        res.status(200).json(event)

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}