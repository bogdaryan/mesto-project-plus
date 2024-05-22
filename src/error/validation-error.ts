import STATUS_CODES from '../utilt/status-codes';

class ValidationError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

export default ValidationError;
