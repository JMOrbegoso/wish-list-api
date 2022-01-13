import { EntityId } from '../../../../shared/domain/entities';

export class WishId extends EntityId {
  protected readonly entityIdType: string = 'WishId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): WishId {
    return new WishId(id);
  }
}
