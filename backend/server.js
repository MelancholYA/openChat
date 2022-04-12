const express = require('express');
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

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);

io.on('connection', async (socket) => {
	const users = (await io.fetchSockets()).map((socket) => {
		return { sokcetId: socket.id, userId: socket.user };
	});

	console.log('socket connected');
	socket.emit('onlineUsers', users);
	socket.on('disconnect', (e) => console.log('socket disconnected'));
});

app.use(errorHandler);

httpServer.listen(PORT, () => console.log('server started on port ' + PORT));
