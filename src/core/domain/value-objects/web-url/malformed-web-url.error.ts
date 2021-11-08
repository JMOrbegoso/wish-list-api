export class MalformedWebUrlError extends Error {
  constructor() {
    super('Malformed URL.');
  }
}
