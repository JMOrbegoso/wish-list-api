import { EntityId } from '../../../../shared/domain/entities/entity-id';

export class WishStageId extends EntityId {
  protected readonly entityIdType: string = 'WishStageId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): WishStageId {
    return new WishStageId(id);
  }
}
