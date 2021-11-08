export class MalformedUserNameError extends Error {
  constructor() {
    super('Malformed UserName.');
  }
}
