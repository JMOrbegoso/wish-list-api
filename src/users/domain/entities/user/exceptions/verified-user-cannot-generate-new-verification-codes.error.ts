export class VerifiedUserCannotGenerateNewVerificationCodesError extends Error {
  constructor() {
    super('Verified user cannot generate new verification codes.');
  }
}
