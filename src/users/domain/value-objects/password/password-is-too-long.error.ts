export class PasswordIsTooLongError extends Error {
  constructor() {
    super('Password is too long.');
  }
}
