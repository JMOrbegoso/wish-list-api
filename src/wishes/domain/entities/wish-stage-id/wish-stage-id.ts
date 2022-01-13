import { EntityId } from '../../../../shared/domain/entities';

export class WishStageId extends EntityId {
  protected readonly entityIdType: string = 'WishStageId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): WishStageId {
    return new WishStageId(id);
  }

  public equals(other?: WishStageId): boolean {
    return super._equals(other);
  }
}
