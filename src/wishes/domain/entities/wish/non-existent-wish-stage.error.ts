export class NonExistentWishStageError extends Error {
  constructor() {
    super('Wish stage do not exist.');
  }
}
