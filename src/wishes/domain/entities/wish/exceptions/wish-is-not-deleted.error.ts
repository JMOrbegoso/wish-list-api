export class WishIsNotDeletedError extends Error {
  constructor() {
    super('The Wish is not deleted.');
  }
}
