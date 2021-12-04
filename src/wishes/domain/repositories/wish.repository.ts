import { Repository } from '../../../core/domain/repositories';
import { UniqueId } from '../../../core/domain/value-objects';
import { Wish } from '../entities';

export interface WishRepository extends Repository<Wish> {
  getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]>;
}
