import { Router, Request, Response } from 'express';
import NotFoundError from '../error/not-found-error';

import userRouter from './user';
import cardRouter from './card';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

rootRouter.use('*', (req: Request, res: Response) => {
  res.send(new NotFoundError('Запрашиваемый ресурс не найден'));
});

export default rootRouter;
