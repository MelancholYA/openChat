const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlwares/errorMiddlware');
const { udpateUserSocketId } = require('./controllers/socketControllers');
const { protectSocket } = require('./middlwares/socketMidllware');
const Chat = require('./models/chatModel');
const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:3000'],
	},
});
io.use(protectSocket);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);

io.on('connection', async (socket) => {
	console.log('user connected id:' + socket.id);
	//get online users
	const users = (await io.fetchSockets())
		.map((socket) => {
			return { user: socket.id };
		})
		.filter((user) => user.user !== socket.id);

	const chats = await Chat.find({ users: socket.user._id }).select(
		'name , updatedAt , latestMessage',
	);

	//send online users
	io.emit('onlineUsers', users);

	//send recent messages
	socket.emit('recentChats', chats);

	//send private mesage
	socket.on('privateMessage', (data) => {
		socket.to(data.user).emit('privateMessage', data.message);
	});

	socket.on('disconnect', (err) => console.log('user disconected'));
});

app.use(errorHandler);

httpServer.listen(PORT, () => console.log('server started on port ' + PORT));
