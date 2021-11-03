import { Repository } from '../../../core/domain/repositories';
import { Wish } from '../entities';
import { UniqueId } from '../../../core/domain/value-objects';

export interface WishRepository extends Repository<Wish> {
  getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]>;
}
