export class WishTitleIsTooLongError extends Error {
  constructor() {
    super('Wish Title is too long.');
  }
}
