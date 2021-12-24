export class InvalidRefreshTokensError extends Error {
  constructor() {
    super('Invalid RefreshTokens.');
  }
}
