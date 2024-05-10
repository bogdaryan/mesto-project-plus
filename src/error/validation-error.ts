class ValidationError extends Error {
  public statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export default ValidationError;
