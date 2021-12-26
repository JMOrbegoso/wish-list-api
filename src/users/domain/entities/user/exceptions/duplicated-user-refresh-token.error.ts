export class DuplicatedUserRefreshTokenError extends Error {
  constructor() {
    super('Duplicated refresh token.');
  }
}
