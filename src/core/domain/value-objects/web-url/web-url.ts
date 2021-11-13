import { ValueObject, InvalidWebUrlError, MalformedWebUrlError } from '..';

export class WebUrl extends ValueObject<string> {
  public static readonly Regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

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
