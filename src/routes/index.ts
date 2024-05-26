import { Router } from 'express';
import NotFoundError from '../error/not-found-error';

import userRouter from './user';
import cardRouter from './card';

import auth from '../middleware/auth';
import { createUser, login } from '../controlers/user-controler';
import { errorLogger, requestLogger } from '../middleware/logger';
import ERROR_MESSAGES from '../utilt/error-messages';
import userValidator from '../validations/user';

const rootRouter = Router();

rootRouter.use(requestLogger);

rootRouter.post('/signup', userValidator.createUser, createUser);
rootRouter.post('/signin', userValidator.login, login);

rootRouter.use(auth);

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

rootRouter.use('*', () => {
  throw new NotFoundError(ERROR_MESSAGES.SOURCE_404);
});

rootRouter.use(errorLogger);

export default rootRouter;
