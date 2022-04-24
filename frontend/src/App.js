import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Main from './pages/Main';
import io from './utils/Socket';

function App() {
	useEffect(() => {
		io.connect();
		io.on('connect', (socket) => {
			console.log('connected id: ' + io.id);
		});
	}, []);
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/chat' element={<Main />} />
				<Route path='/*' element={<h1>Not Found</h1>} />
			</Routes>
		</Router>
	);
	// const socket = io('ws://localhost:8000/', { autoConnect: false });

	// useEffect(() => {
	// 	socket.auth = {
	// 		token:
	// 			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGYxYzA1OThiODlmMzAxNzlkOTIyOSIsImVtYWlsIjoidXNlckB0ZXN0LmNvbSIsImlhdCI6MTY0OTc3NDQwNH0.x9_5zJ06xvha1H6Yb8cJF53xyLaz9IhJRNWvMa2yevM',
	// 	};
	// 	socket.connect();
	// }, []);

	// socket.on('connect', () => {
	// 	console.log('user connected');
	// });
	// socket.on('onlineUsers', (users) => console.log({ users: users }));
	// socket.on('disconnect', (reason) => {
	// 	console.log('disconnect', reason);
	// });
	// socket.on('connect_error', (e) => {
	// 	console.log(e.message);
	// });
	// return <div className='App'></div>;
}

export default App;
