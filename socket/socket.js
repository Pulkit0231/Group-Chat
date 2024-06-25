import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
const { verify } = jwt;
const socketHandler = (server) => {
    const io = new Server(server);

    io.use((socket, next) => {
        const token = socket.handshake.query.token;
        if (!token) return next(new Error('Authentication error'));

        verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.user = decoded.userId;
            next();
        });
    });

    io.on('connection', (socket) => {
        console.log('New connection');

        socket.on('joinGroup', (groupId) => {
            socket.join(groupId);
            io.to(groupId).emit('userJoined', socket.user);
        });

        socket.on('leaveGroup', (groupId) => {
            socket.leave(groupId);
            io.to(groupId).emit('userLeft', socket.user);
        });

        socket.on('sendMessage', async ({ groupId, content }) => {
            const message = new Message({
                group: groupId,
                sender: socket.user,
                content,
            });
            await message.save();
            io.to(groupId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default socketHandler;
