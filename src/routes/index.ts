import { Router, Request, Response } from 'express';
import NotFoundError from '../error/not-found-error';

import userRouter from './user';
import cardRouter from './card';

import auth from '../middleware/auth';
import { createUser, login } from '../controlers/user-controler';
import { errorLogger, requestLogger } from '../middleware/logger';

const rootRouter = Router();

rootRouter.use(requestLogger);

rootRouter.post('/signup', createUser);
rootRouter.post('/signin', login);

rootRouter.use(auth);

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

rootRouter.use('*', (req: Request, res: Response) => {
  res.send(new NotFoundError('Запрашиваемый ресурс не найден'));
});

rootRouter.use(errorLogger);

export default rootRouter;