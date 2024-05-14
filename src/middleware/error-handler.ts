import { ErrorRequestHandler } from 'express';

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'Ошибка на сервере' : err.message;

  res.status(statusCode).send({ message });

  next();
};

export default handleError;
