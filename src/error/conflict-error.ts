import STATUS_CODES from '../utilt/status-codes';

class ConflictError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

export default ConflictError;
