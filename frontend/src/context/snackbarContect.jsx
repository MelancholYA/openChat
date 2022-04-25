import { createContext, useState } from 'react';
export const context = createContext();
const SnackbarContxectProvider = ({ children }) => {
	const [snackBar, toggleSnackbar] = useState({
		isShown: false,
		message: '',
		type: null,
	});

	return (
		<context.Provider value={{ snackbar: toggleSnackbar }}>
			{snackBar.isShown && (
				<div className={`snackbar ${snackBar.type || ''}`}>
					<p className='snackbar_message'>{snackBar.message}</p>
					<button
						className='snackbar_button'
						onClick={() => toggleSnackbar({ isShown: false })}></button>
				</div>
			)}
			{children}
		</context.Provider>
	);
};

export default SnackbarContxectProvider;
