export class UsernameIsTooLongError extends Error {
  constructor() {
    super('Username is too long.');
  }
}
