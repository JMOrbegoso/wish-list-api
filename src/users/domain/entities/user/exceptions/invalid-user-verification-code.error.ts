export class InvalidUserVerificationCodeError extends Error {
  constructor() {
    super('Invalid User verification code.');
  }
}
