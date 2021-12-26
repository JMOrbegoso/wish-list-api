export class InvalidWishCreatedAtError extends Error {
  constructor() {
    super('Invalid Wish Stage created at date.');
  }
}
