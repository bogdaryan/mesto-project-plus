import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user';

const URL = 'mongodb://localhost:27017/mestodb';

const app = express();
app.use(express.json());

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB conection error ${err}`));

app.use('/users', userRouter);

app.listen(3001, () => {
  console.log('Server working...');
});
