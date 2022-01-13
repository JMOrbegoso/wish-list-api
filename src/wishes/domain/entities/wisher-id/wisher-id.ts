import { EntityId } from '../../../../shared/domain/entities';

export class WisherId extends EntityId {
  protected readonly entityIdType: string = 'WisherId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): WisherId {
    return new WisherId(id);
  }

  public equals(other?: WisherId): boolean {
    return super._equals(other);
  }
}
