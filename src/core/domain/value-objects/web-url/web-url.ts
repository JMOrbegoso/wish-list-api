import { ValueObject, InvalidWebUrlError, MalformedWebUrlError } from '..';

export class WebUrl extends ValueObject<string> {
  protected validate(value: string): void {
    let url: URL;
    if (!value) throw new InvalidWebUrlError();

    try {
      url = new URL(value);
    } catch {
      throw new MalformedWebUrlError();
    }

    if (!(url.protocol === 'http:' || url.protocol === 'https:'))
      throw new MalformedWebUrlError();
  }

  static create(value: string): WebUrl {
    return new WebUrl(value);
  }

  public get getUrl(): string {
    return this.value;
  }
}
