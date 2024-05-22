import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './types';
import BadRequestError from '../error/bad-request-error';
import ERROR_MESSAGES from '../utilt/error-messages';

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: 'Некорректный URL',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
});

userSchema.statics.findUserByCredentials = function findByCredentials(
  email: string,
  password: string
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(
        new BadRequestError(ERROR_MESSAGES.AUTHORIZATION_BAD_DATA)
      );
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(
          new BadRequestError(ERROR_MESSAGES.AUTHORIZATION_BAD_DATA)
        );
      }

      return user;
    });
  });
};

export default mongoose.model<IUser, UserModel>('User', userSchema);
