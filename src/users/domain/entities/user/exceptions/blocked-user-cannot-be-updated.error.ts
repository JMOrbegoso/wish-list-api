export class BlockedUserCannotBeUpdatedError extends Error {
  constructor() {
    super('Blocked User cannot be updated.');
  }
}
