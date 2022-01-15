export class DeletedUserCannotBeUpdatedError extends Error {
  constructor() {
    super('Deleted User cannot be updated.');
  }
}
