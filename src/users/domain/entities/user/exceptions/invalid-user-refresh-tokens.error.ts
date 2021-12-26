export class InvalidUserRefreshTokensError extends Error {
  constructor() {
    super('Invalid User refresh tokens.');
  }
}
