export class FirstNameIsTooLongError extends Error {
  constructor() {
    super('First Name is too long.');
  }
}
