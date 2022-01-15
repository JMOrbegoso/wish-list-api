export class BlockedUserCannotGenerateNewVerificationCodesError extends Error {
  constructor() {
    super('Blocked user cannot generate new verification codes.');
  }
}
