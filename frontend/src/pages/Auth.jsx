import { Grid } from '@mui/material';

const Auth = () => {
	return (
		<Grid container spacing={0} sx={{ height: '100vh' }}>
			<Grid
				item
				sm={0}
				md={7}
				sx={false}
				style={{
					background:
						"url('https://unsplash.com/photos/_0aKQa9gr4s/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzd8fHNvY2lhbCUyMG5ldHdvcmt8ZW58MHwyfHx8MTY0OTc4MDMwNw&force=true&w=640')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item sm={12} md={5}>
				<h1 style={{ width: 'fit-content' }}>hi</h1>
			</Grid>
		</Grid>
	);
};
export default Auth;
