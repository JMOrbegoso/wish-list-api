export class DeletedWishCannotBeUncompletedError extends Error {
  constructor() {
    super('Deleted Wish cannot be uncompleted.');
  }
}
