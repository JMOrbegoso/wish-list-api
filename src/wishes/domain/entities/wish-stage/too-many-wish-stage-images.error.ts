export class TooManyWishStageImagesError extends Error {
  constructor() {
    super('Images limit reached in the WishStage.');
  }
}
