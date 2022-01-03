export class InvalidRefreshTokenError extends Error {
  constructor() {
    super('Invalid Refresh Token.');
  }
}
