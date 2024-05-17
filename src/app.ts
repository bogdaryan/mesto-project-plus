import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import handleError from './middleware/error-handler';
import rootRouter from './routes/index';

const URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: '6638a841da496192789ea281',
  };

  next();
});

app.use(rootRouter);
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
