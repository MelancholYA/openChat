const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5005;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const { errorHandler } = require('./middlwares/errorMiddlware');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log('server started on port ' + PORT));
