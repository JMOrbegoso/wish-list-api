export class UserNameIsTooLongError extends Error {
  constructor() {
    super('UserName is too long.');
  }
}
