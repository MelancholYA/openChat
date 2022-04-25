import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context/snackbarContect';
import io from '../../utils/Socket';
import Search from './Search';

const RecentMessages = () => {
	const [isExpended, setIsExpended] = useState(false);
	const [messages, setMessages] = useState(null);
	const { snackbar } = useContext(context);

	useEffect(() => {
		io.connect();
		io.on('recentChats', (data) => console.log(data));
		io.on('onlineUsers', (data) => console.log(data));
		return () => io.disconnect();
	}, []);

	return (
		<div className={`sider_container${isExpended ? ' expended' : ''}`}>
			<div className='sider_container_header'>
				<h5>Recent Messages</h5>
				<svg
					className={isExpended ? 'rolled' : ''}
					onClick={() => {
						setIsExpended(!isExpended);
						snackbar({ isShown: !isExpended, message: 'hi', type: 'alert' });
					}}
					xmlns='http://www.w3.org/2000/svg'
					width='15'
					fill='#ffffff'
					viewBox='0 0 320 512'>
					<path d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z' />
				</svg>
			</div>
			<Search placeholder='Search Messages' />
			{/* {req.loading && (
					<div className='sider_container_spinner'>
						<Spinner height='50px' />
					</div>
				)}
				{req.error && (
					<div className='sider_container_error'>
						<h4>{req.error}</h4>
					</div>
				)}
				 */}
			{messages &&
				messages.map((message) => (
					<div className='sider_container_message' key={message._id}>
						<h1>{message.latestMessage}</h1>
					</div>
				))}
		</div>
	);
};

export default RecentMessages;
