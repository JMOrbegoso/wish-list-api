export class InvalidPasswordHashError extends Error {
  constructor() {
    super('Invalid Password Hash.');
  }
}
