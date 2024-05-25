import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../error/auth-error';
import ERROR_MESSAGES from '../utilt/error-messages';
import { SECRET_KEY } from '../utilt/constants';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(ERROR_MESSAGES.AUTHORIZATION_NEED);
  }

  const token = extractBearerToken(authorization);

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthError(ERROR_MESSAGES.INVALID_TOKET);
  }

  res.locals.user = payload;

  return next();
};
