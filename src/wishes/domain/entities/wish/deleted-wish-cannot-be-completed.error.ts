export class DeletedWishCannotBeCompletedError extends Error {
  constructor() {
    super('Deleted Wish cannot be completed.');
  }
}
