import { ValueObject } from '..';

export class WebUrl extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new Error('Invalid url.');

    const url = new URL(value);

    if (!(url.protocol === 'http:' || url.protocol === 'https:'))
      throw new Error('Invalid url.');
  }

  static create(value: string): WebUrl {
    return new WebUrl(value);
  }
}
