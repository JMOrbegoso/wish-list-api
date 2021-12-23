export class DuplicatedRefreshTokenError extends Error {
  constructor() {
    super('Duplicated RefreshToken.');
  }
}
