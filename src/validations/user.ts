import { celebrate, Joi } from 'celebrate';
import { urlRegEX } from '../utilt/constants';

class UserValidation {
  updateUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
    }),
  });

  updateUserAvatar = celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(urlRegEX).required(),
    }),
  });

  getUser = celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).required(),
    }),
  });

  createUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().regex(urlRegEX),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  });

  login = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  });
}

const userValidator = new UserValidation();

export default userValidator;
