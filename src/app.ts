import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/user';
import cardRouter from './routes/card';
import handleError from './middleware/error-handler';

const URL = 'mongodb://localhost:27017/mestodb';

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: '6638a841da496192789ea281',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(handleError);

function connect() {
  try {
    mongoose
      .connect(URL)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(`DB conection error ${err}`));

    app.listen(3000, () => console.log('Server working...'));
  } catch (err) {
    console.log(err);
  }
}

connect();
