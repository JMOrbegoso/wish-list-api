export class CategoryNameIsTooLongError extends Error {
  constructor() {
    super('Category name is too long.');
  }
}
