export class UsernameIsTooShortError extends Error {
  constructor() {
    super('Username is too short.');
  }
}
