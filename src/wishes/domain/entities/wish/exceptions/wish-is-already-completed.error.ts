export class WishIsAlreadyCompletedError extends Error {
  constructor() {
    super('Wish is already completed.');
  }
}
