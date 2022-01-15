export class DeletedUserCannotGenerateNewVerificationCodesError extends Error {
  constructor() {
    super('Deleted user cannot generate new verification codes.');
  }
}
