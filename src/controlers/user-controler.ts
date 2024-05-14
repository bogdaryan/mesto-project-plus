import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import User from '../models/user';
import ValidationError from '../error/validation-error';
import NotFoundError from '../error/not-found-error';
import BadRequestError from '../error/bad-request-error';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Передан невалидный id пользователя'));
      }

      return next(error);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы невалидные данные'));
      }

      return next(error);
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(res.locals.user._id, req.body)
    .orFail(() => new BadRequestError('Переданы некорректные данные'))
    .then((result) => res.status(200).send(result))
    .catch((error) => next(error));
};

export const updateProfileAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(res.locals.user._id, req.body)
    .orFail(() => new BadRequestError('Переданы некорректные данные'))
    .then((result) => res.status(200).send(result))
    .catch((error) => next(error));
};