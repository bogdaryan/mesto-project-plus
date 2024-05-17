import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import ValidationError from '../error/validation-error';
import BadRequestError from '../error/bad-request-error';
import NotFoundError from '../error/not-found-error';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({
    ...req.body,
    owner: res.locals.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы невалидные данные'));
      }

      return next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => new NotFoundError('Ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы невалидные данные'));
      }

      return next(error);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: res.locals.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы невалидные данные'));
      }

      return next(error);
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: res.locals.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы невалидные данные'));
      }

      return next(error);
    });
};
