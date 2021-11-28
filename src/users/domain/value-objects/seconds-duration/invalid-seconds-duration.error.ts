export class InvalidSecondsDurationError extends Error {
  constructor() {
    super('Invalid duration in seconds.');
  }
}
