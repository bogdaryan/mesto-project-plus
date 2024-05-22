import STATUS_CODES from '../utilt/status-codes';

class AuthError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

export default AuthError;
