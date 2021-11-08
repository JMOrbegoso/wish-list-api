export class LastNameIsTooLongError extends Error {
  constructor() {
    super('Last Name is too long.');
  }
}
