import express from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.js';
import walletRouter from './routes/walletRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use(authRouter);
app.use(walletRouter);

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})