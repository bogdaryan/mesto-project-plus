import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../error/auth-error';
import ERROR_MESSAGES from '../utilt/error-messages';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

// const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  console.log(req.headers);

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return new AuthError(ERROR_MESSAGES.AUTHORIZATION_NEED);
  // }

  // const token = authorization;
  // let payload;

  // try {
  //   payload = jwt.verify(token, 'super-strong-secret');
  // } catch (err) {
  //   return new AuthError(ERROR_MESSAGES.AUTHORIZATION_NEED);
  // }

  // res.locals.user._id = payload;

  return next();
};
