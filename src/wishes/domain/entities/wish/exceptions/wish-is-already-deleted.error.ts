export class WishIsAlreadyDeletedError extends Error {
  constructor() {
    super('The Wish is already deleted.');
  }
}
