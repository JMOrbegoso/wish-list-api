export class InvalidUserVerificationCodesError extends Error {
  constructor() {
    super('Invalid User verification codes.');
  }
}
