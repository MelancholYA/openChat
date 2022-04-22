import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const token = localStorage.getItem('openchatToken');
	const [req, setReq] = useState({
		loading: false,
		error: null,
		res: null,
	});

	const getData = async (url) => {
		setReq({
			loading: true,
			error: null,
			res: null,
		});
		await axios
			.get(url, { headers: { 'x-auth-token': token } })
			.then((res) =>
				setReq({
					loading: false,
					error: null,
					res: res.data,
				}),
			)
			.catch((err) => {
				setReq({
					loading: false,
					error: err.response ? err.response.data.message : err.message,
					res: null,
				});
			});
	};
	return { getData, req };
};

export default useFetch;
