import { UniqueId } from '../../../shared/domain/value-objects';
import { Wisher } from '../../domain/entities';
import { WisherEntity } from '../persistence/entities';

export function wisherEntityToWisher(wisherEntity: WisherEntity): Wisher {
  const id = UniqueId.create(wisherEntity.id);

  return Wisher.create(id);
}
