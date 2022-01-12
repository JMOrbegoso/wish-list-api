import { EntityId } from '../../../../shared/domain/entities/entity-id';

export class RefreshTokenId extends EntityId {
  protected readonly entityIdType = 'RefreshTokenId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): RefreshTokenId {
    return new RefreshTokenId(id);
  }
}
