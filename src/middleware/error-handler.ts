import { ErrorRequestHandler } from 'express';
import STATUS_CODES from '../utilt/status-codes';

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.SERVER;

  // eslint-disable-next-line operator-linebreak
  const message =
    statusCode === STATUS_CODES.SERVER ? 'Ошибка на сервере' : err.message;

  res.status(statusCode).send({ message });

  next();
};

export default handleError;
