import { celebrate, Joi } from 'celebrate';
import { urlRegEX } from '../utilt/constants';

class CardValidation {
  createCard = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().regex(urlRegEX).required(),
      owner: Joi.string(),
    }),
  });

  deleteCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required(),
    }),
  });

  likeCard = this.deleteCard;

  dislikeCard = this.deleteCard;
}

const cardValidator = new CardValidation();

export default cardValidator;
