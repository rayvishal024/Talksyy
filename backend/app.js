import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import helmet from 'helmet'

import authRouter from './routes/auth.routes.js'
import otpRouter from './routes/otp.routes.js'
import messageRouter from './routes/message.routes.js'

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// set up routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/message', messageRouter);

app.get('/', (req, res) => {
     res.send("This is Talksyy endpoint")
})

export default app;