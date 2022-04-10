const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5005;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const { errorHandler } = require('./middlwares/errorMiddlware');
const connectDB = require('./config/db');
const app = express();
const expressWs = require('express-ws')(app);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);

// app.ws('/ws', function (wsi, req) {
// 	wsi.on('connection', () => console.log('connected'));
// 	wsi.on('message', function (msg) {
// 		wsi.send('expressWs.getWss().clients');
// 		console.log(expressWs.getWss().clients);
// 	});
// });
expressWs.app.ws('/ws', (ws, req) => {
	ws.on('message', function (msg) {
		ws.send('expressWs.getWss().clients');
		console.log(typeof expressWs.getWss().clients);
	});
});

app.use(errorHandler);

app.listen(PORT, () => console.log('server started on port ' + PORT));
