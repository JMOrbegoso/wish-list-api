import { InvalidWebUrlError, MalformedWebUrlError, ValueObject } from '..';

export class WebUrl extends ValueObject<string> {
  public static readonly Regex =
    /^(http(s)?:\/\/){1}([\w\:\-]+){1}(\.[\w\.-]+){0,1}[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  protected validate(value: string): void {
    if (!value) throw new InvalidWebUrlError();

    if (!WebUrl.Regex.test(value)) throw new MalformedWebUrlError();
  }

  static create(value: string): WebUrl {
    return new WebUrl(value);
  }

  public get getUrl(): string {
    return this.value;
  }
}
