import { Wisher, WisherId } from '../../domain/entities';
import { WisherEntity } from '../persistence/entities';

export function wisherEntityToWisher(wisherEntity: WisherEntity): Wisher {
  const wisherId = WisherId.create(wisherEntity.id);

  return Wisher.create(wisherId);
}
