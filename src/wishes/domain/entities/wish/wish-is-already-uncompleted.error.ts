export class WishIsAlreadyUncompletedError extends Error {
  constructor() {
    super('Wish is already uncompleted.');
  }
}
