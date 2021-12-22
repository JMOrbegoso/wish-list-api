export class UnverifiedUserCannotBeUpdatedError extends Error {
  constructor() {
    super('Unverified User cannot be updated.');
  }
}
