import { InvalidEntityIdError } from '..';

export abstract class EntityId {
  /**
   * Disable TypeScript autocast when field names are the same:
   * https://stackoverflow.com/questions/65749582/is-it-possible-to-disable-typescript-autocast-when-field-names-are-the-same
   */
  protected abstract readonly entityIdType: string;

  private readonly id: string | number;

  public get value(): string | number {
    return this.id;
  }

  protected constructor(id: string | number) {
    if (!id) throw new InvalidEntityIdError();

    this.id = id;
  }

  protected _equals(other?: EntityId): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  public abstract equals(other?: EntityId): boolean;
}
