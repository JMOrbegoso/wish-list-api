export class DeletedWishCannotBeUpdatedError extends Error {
  constructor() {
    super('Deleted Wish cannot be updated.');
  }
}
