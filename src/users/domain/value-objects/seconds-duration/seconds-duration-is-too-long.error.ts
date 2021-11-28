export class SecondsDurationIsTooLongError extends Error {
  constructor() {
    super('Duration in seconds is too long.');
  }
}
