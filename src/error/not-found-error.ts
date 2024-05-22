import STATUS_CODES from '../utilt/status-codes';

class NotFoundError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export default NotFoundError;
