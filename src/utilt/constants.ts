/* eslint-disable no-useless-escape */
const { NODE_ENV, JWT_SECRET = 'dev secret' } = process.env;

export const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

// eslint-disable-next-line operator-linebreak
export const urlRegEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
