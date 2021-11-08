export class BiographyIsTooLongError extends Error {
  constructor() {
    super('Biography is too long.');
  }
}
