export class PasswordIsTooShortError extends Error {
  constructor() {
    super('Password is too short.');
  }
}
