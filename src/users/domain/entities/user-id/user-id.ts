import { EntityId } from '../../../../shared/domain/entities/entity-id';

export class UserId extends EntityId {
  protected readonly entityIdType = 'UserId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): UserId {
    return new UserId(id);
  }
}
