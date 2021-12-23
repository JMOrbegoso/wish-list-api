export class RefreshTokenNotFoundError extends Error {
  constructor() {
    super('Refresh Token not found.');
  }
}
