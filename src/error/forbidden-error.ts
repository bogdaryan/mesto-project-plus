import STATUS_CODES from '../utilt/status-codes';

class ForbiddenError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

export default ForbiddenError;
