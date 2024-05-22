import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import ValidationError from '../error/validation-error';
import BadRequestError from '../error/bad-request-error';
import NotFoundError from '../error/not-found-error';
import ERROR_MESSAGES from '../utilt/error-messages';
import STATUS_CODES from '../utilt/status-codes';

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
    .then((card) => res.status(STATUS_CODES.CREATED).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => new NotFoundError(ERROR_MESSAGES.SOURCE_404))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
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
    .orFail(() => new NotFoundError(ERROR_MESSAGES.SOURCE_404))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
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
    .orFail(() => new NotFoundError(ERROR_MESSAGES.SOURCE_404))
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }

      return next(error);
    });
};
