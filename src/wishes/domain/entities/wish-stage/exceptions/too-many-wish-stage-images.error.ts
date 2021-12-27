export class TooManyWishStageImagesError extends Error {
  constructor() {
    super('Images quantity limit reached in the Wish Stage.');
  }
}
