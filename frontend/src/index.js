import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SnackbarContxectProvider from './context/snackbarContect';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<SnackbarContxectProvider>
			<App />
		</SnackbarContxectProvider>
	</StrictMode>,
);
