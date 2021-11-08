export class WishDescriptionIsTooLongError extends Error {
  constructor() {
    super('Wish Description is too long.');
  }
}
