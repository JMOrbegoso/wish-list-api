export class TooManyWishStageUrlsError extends Error {
  constructor() {
    super('Urls limit reached in the WishStage.');
  }
}
