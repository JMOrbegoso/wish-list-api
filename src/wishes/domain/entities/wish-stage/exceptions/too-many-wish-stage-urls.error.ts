export class TooManyWishStageUrlsError extends Error {
  constructor() {
    super('Urls quantity limit reached in the Wish Stage.');
  }
}
