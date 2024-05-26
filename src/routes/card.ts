import { Router } from 'express';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controlers/card-controler';
import cardValidator from '../validations/card';

const router = Router();

router.get('/', getCards);
router.post('/', cardValidator.createCard, createCard);
router.delete('/:cardId', cardValidator.deleteCard, deleteCard);
router.put('/:cardId/likes', cardValidator.likeCard, likeCard);
router.delete('/:cardId/likes', cardValidator.dislikeCard, dislikeCard);

export default router;
