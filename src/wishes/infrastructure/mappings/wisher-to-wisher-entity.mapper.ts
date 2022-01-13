import { Wisher } from '../../domain/entities';
import { WisherEntity } from '../persistence/entities';

export function wisherToWisherEntity(wisher: Wisher): WisherEntity {
  const wisherEntity = new WisherEntity();

  wisherEntity.id = wisher.id.value.toString();

  return wisherEntity;
}
