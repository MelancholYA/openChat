import { Navigate } from 'react-router-dom';

const Main = () => {
	const token = localStorage.getItem('openchatToken');

	if (!token) {
		return <Navigate replace to='/' />;
	}

	return <div>Main</div>;
};

export default Main;
