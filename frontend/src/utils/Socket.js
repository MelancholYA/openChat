import { io } from 'socket.io-client';

const socket = io('ws://localhost:8000', {
	auth: {
		token: localStorage.getItem('openchatToken'),
	},
	autoConnect: false,
});

export default socket;
