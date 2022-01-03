export class InvalidUserRefreshTokenError extends Error {
  constructor() {
    super('Invalid User refresh token.');
  }
}
