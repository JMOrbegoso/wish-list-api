import { WisherId } from '..';
import { Entity } from '../../../../shared/domain/entities';

export class Wisher extends Entity<WisherId> {
  private constructor(id: WisherId) {
    super(id);
  }

  public static create(id: WisherId): Wisher {
    return new Wisher(id);
  }
}
