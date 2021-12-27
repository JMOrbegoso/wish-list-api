export class InvalidRefreshTokenDurationError extends Error {
  constructor() {
    super('Invalid RefreshToken duration.');
  }
}
