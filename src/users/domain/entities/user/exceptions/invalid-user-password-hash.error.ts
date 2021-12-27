export class InvalidUserPasswordHashError extends Error {
  constructor() {
    super('Invalid User password hash.');
  }
}
