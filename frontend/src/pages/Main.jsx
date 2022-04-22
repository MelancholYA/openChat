import { Navigate } from 'react-router-dom';
import Sider from '../componants/sider';

const Main = () => {
	const token = localStorage.getItem('openchatToken');

	if (!token) {
		return <Navigate replace to='/' />;
	}

	return (
		<div className='Main'>
			<Sider />
		</div>
	);
};

export default Main;
