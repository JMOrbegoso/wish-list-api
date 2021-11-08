export class MalformedPasswordError extends Error {
  constructor() {
    super('Malformed Password.');
  }
}
