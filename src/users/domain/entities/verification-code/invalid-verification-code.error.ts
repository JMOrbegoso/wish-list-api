export class InvalidVerificationCodeError extends Error {
  constructor() {
    super('Invalid VerificationCode.');
  }
}
