import express from 'express';
import * as http from 'http';
import mongoose from 'mongoose';
import postRouter from './routes/postRoutes.js';
import cors from 'cors';
import commentRouter from './routes/commentRoute.js';
import profileRouter from './routes/profileRoute.js';
import dotenv from 'dotenv';
import eventRouter from './routes/eventRoutes.js';
import { Server } from 'socket.io';
import UserProfile from './schema/profileSchema.js';
import { FriendRequest } from './schema/friendRequest.js';
import { OneToOneMessage } from './schema/OneToOneMessage.js';
dotenv.config();



const app = express()
app.use(cors())
const server = http.createServer(app);
app.use(express.json({ limit: '2MB' }))
app.use('/api/comments', commentRouter)
app.use('/api/events', eventRouter)
app.use('/api/posts', postRouter)
app.use('/api/profile', profileRouter)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        origin: 'https://linkedin-clone-786p.onrender.com',
        methods: ["GET", "POST"]
    }
});



mongoose.connect(process.env.CONNECTION__KEY).then(() => {

    server.listen(process.env.PORT, () => console.log('at 5000'))
}).catch((error) => console.log(error))

io.on('disconnect', () => {
    console.log('dis')
})


io.on('connection', async (socket) => {
    const user_id = socket.handshake.query["user_id"]
    console.log(user_id, 'connected')

    const socket_id = socket.id
    if (Boolean(user_id)) {
        await UserProfile.findByIdAndUpdate(user_id, { socket_id, status: "Online" })
    }

    // if connected user sends a friend request
    socket.on('friend_request', async (data) => {
        console.log('fr',data)
        // data.from==> current user user_id who will send fr...req

        // data.to==> to whome current user user_id will send fr...req
        const to_user = await UserProfile.findById(data.to).select("socket_id")
        const from_user = await UserProfile.findById(data.from).select("socket_id")


        // create a friend request
        await FriendRequest.create({
            sender: data.from,
            recipient: data.to
        })

        // emit event => "new friend request"

        io.to(to_user.socket_id).emit('new_friend_request', {
            message: "New friend request recieved"
        })

        // emit event => "request sent"

        io.to(from_user.socket_id).emit('request_sent', {
            message: "request sent"
        })


    })


    socket.on("accept_request", async (data) => {

        const request_doc = await FriendRequest.findById(data.request_id)
        // console.log('fr',request_doc)

        const sender = await UserProfile.findById(request_doc.sender)
        const receiver = await UserProfile.findById(request_doc.recipient)

        sender.friends.push(request_doc.recipient)
        receiver.friends.push(request_doc.sender)

        await receiver.save({ new: true, validateModifiedOnly: true })
        await sender.save({ new: true, validateModifiedOnly: true })

        await FriendRequest.findByIdAndDelete(data.request_id)

        io.to(sender.socket_id).emit('request_accepted', {
            message: "request accepted"
        })
        io.to(receiver.socket_id).emit('request_accepted', {
            message: "request accepted"
        })
    })
    socket.on("reject_request", async (data) => {

        const request_doc = await FriendRequest.findById(data.request_id)
        const sender = await UserProfile.findById(request_doc.sender)
        const receiver = await UserProfile.findById(request_doc.recipient)

        // console.log('rfr',request_doc)



        await FriendRequest.findByIdAndDelete(data.request_id)

        io.to(sender.socket_id).emit('request_rejected', {
            message: "request rejected"
        })
        io.to(receiver.socket_id).emit('request_rejected', {
            message: "request rejected"
        })
    })

    socket.on("get_direct_conversations", async ({ user_id }, callback) => {

        const existing_conversations = await OneToOneMessage.find({
            participants: { $all: [user_id] }
        }).populate('participants', 'name _id status selectedFile createdAt')

        // console.log('exist conv',existing_conversations)
        callback(existing_conversations)

    })



    socket.on('start_conversation', async (data) => {
        console.log("start", data)
        const { to, from } = data
        // if existing convers bw hese users
        const existing_conversations = await OneToOneMessage.find({
            participants: {
                $size: 2, $all: [to, from]
            }
        }).populate('participants', 'name _id status')
        console.log(existing_conversations[0])

        // if no existing conversation 
        if (existing_conversations.length === 0) {
            let new_chat = await OneToOneMessage.create({
                participants: [to, from]
            })

            // hahahha
            new_chat = await OneToOneMessage.findById(new_chat._id).populate('participants', 'name _id status')
            console.log("new conv", new_chat)

            socket.emit("start_chat", new_chat)
        }
        else {
            // if existing convers
            console.log("old conv")
            socket.emit("start_chat", existing_conversations[0])
        }

    })

    // handle text mg
    socket.on("get_messages", async (data, callback) => {
        // console.log('error',data,callback)
        const { messages } = await OneToOneMessage.findById(data.conversation_id).select("messages")
        callback(messages)
    })

    // handle text and link message
    socket.on("text_message", async (data) => {
        // console.log("recieved msg",data)
        console.log('hii')

        // data:{to,from,text,conversation_id,type}
        const { to, from, message, conversation_id, type } = data
        const to_user = await UserProfile.findById(to)
        const from_user = await UserProfile.findById(from)

        const new_message = {
            to, from, type,
            text: message,
            created_at: Date.now()
        }

        // create a new conversation if it doesnt exist yet or add new msg to list
        const chat = await OneToOneMessage.findById(conversation_id)
        chat.messages.push(new_message)
        // save to db
        const a = await chat.save({ new: true, validateModifiedOnly: true })
        // console.log('a',a)


        // emit new_message  => to user
        io.to(to_user?.socket_id).emit('new_message',
            {
                conversation_id,
                message: new_message
            }
        )

        // emit new_message to sender
        io.to(from_user?.socket_id).emit('new_message',
            {
                conversation_id,
                message: new_message
            }
        )

    })


    socket.on('file_message', (data) => {
        // console.log("recieved msg",data)
        // data:{to,from,text}



    })


    socket.on("end", async (data) => {
        if (data.user_id) {
            await UserProfile.findByIdAndUpdate(data.user_id), { status: "Offline" }
        }

        // broadcast that user is disconnected

        // console.log("closing connection")
        socket.disconnect(0)
    })


});


