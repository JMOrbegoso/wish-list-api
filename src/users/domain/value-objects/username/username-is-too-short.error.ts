export class UserNameIsTooShortError extends Error {
  constructor() {
    super('UserName is too short.');
  }
}
