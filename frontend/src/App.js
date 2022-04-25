import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { context } from './context/snackbarContect';
import Auth from './pages/Auth';
import Main from './pages/Main';
import socket from './utils/Socket';

function App() {
	const { snackbar } = useContext(context);

	useEffect(() => {
		socket.connect();
		socket.on('connect', () => {
			console.log('connected id: ' + socket.id);
		});
		socket.on('connect_error', (err) => {
			console.log(err);
			snackbar({
				isShown: true,
				type: 'error',
				message: 'something went wrong with our server , reconnecting...',
				duration: 10,
			});
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
}

export default App;
