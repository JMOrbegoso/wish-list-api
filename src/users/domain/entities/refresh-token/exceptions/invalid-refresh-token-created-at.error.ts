export class InvalidRefreshTokenCreatedAtError extends Error {
  constructor() {
    super('Invalid RefreshToken created at date.');
  }
}
