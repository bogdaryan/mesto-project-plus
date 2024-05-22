import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user';
import ValidationError from '../error/validation-error';
import NotFoundError from '../error/not-found-error';
import ConflictError from '../error/conflict-error';
import ERROR_MESSAGES from '../utilt/error-messages';
import { SECRET_KEY } from '../utilt/constants';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError(ERROR_MESSAGES.USER_404))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new ValidationError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash: string) => User.create({ email, password: hash }))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(ERROR_MESSAGES.INVALID_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.USER_EXISTS));
      }

      return next(error);
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(res.locals.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError(ERROR_MESSAGES.USER_404))
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};

export const updateProfileAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(res.locals.user._id, req.body.avatar, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError(ERROR_MESSAGES.USER_404))
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });

      res.header('Authorization', token).send({ token });
    })
    .catch(next);
};
