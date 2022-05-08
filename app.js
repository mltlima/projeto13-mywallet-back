import express from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use(authRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})