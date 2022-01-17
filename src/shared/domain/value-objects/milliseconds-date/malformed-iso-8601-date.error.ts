export class MalformedIso8601DateError extends Error {
  constructor() {
    super('Malformed ISO 8601 date.');
  }
}
