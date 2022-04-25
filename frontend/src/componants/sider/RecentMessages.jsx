import React, { useEffect, useState } from 'react';
import moment from 'moment';
import io from '../../utils/Socket';
import Spinner from '../shared/Spinner';
import Search from './Search';

const RecentMessages = () => {
	const [isExpended, setIsExpended] = useState(false);
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		io.on('recentChats', (data) => {
			setLoading(false);
			setMessages(data);
		});
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
					}}
					xmlns='http://www.w3.org/2000/svg'
					width='15'
					fill='#ffffff'
					viewBox='0 0 320 512'>
					<path d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z' />
				</svg>
			</div>
			<Search placeholder='Search Messages' />
			{loading && (
				<div className='sider_container_spinner'>
					<Spinner height='50px' />
				</div>
			)}
			{messages &&
				!loading &&
				messages.map((message) => (
					<div className='sider_container_message' key={message._id}>
						<div className='sider_container_message_details'>
							<h5 className='sider_container_message_details_body'>
								{message.latestMessage}
							</h5>
							<h6 className='sider_container_message_details_sender'>
								{message.name}
							</h6>
						</div>
						<h6 className='sider_container_message_date'>
							{moment(message.updatedAt).format('DD|MM|YYYY')}
						</h6>
					</div>
				))}
		</div>
	);
};

export default RecentMessages;
