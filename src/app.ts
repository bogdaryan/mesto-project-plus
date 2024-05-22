import 'dotenv/config';
import express from 'express';
import { NextFunction, Request, Response } from 'express';

import mongoose from 'mongoose';
import helmet from 'helmet';
import rootRouter from './routes/index';
import handleError from './middleware/error-handler';

// eslint-disable-next-line operator-linebreak
const { URL_DB = 'mongodb://localhost:27017/mestodb', PORT = 3000 } =
  process.env;

const app = express();

app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: '664884b14ab1ef6c317563f6',
  };

  next();
});

app.use(rootRouter);
app.use(handleError);

function connect() {
  try {
    mongoose
      .connect(URL_DB)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(`DB conection error ${err}`));

    app.listen(PORT, () => console.log('Server working...'));
  } catch (err) {
    console.log(err);
  }
}

connect();
