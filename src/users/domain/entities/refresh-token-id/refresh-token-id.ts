import { EntityId } from '../../../../shared/domain/entities';

export class RefreshTokenId extends EntityId {
  protected readonly entityIdType = 'RefreshTokenId';

  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): RefreshTokenId {
    return new RefreshTokenId(id);
  }

  public equals(other?: RefreshTokenId): boolean {
    return super._equals(other);
  }
}
