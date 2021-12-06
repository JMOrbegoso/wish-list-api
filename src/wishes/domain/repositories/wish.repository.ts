import { Repository } from '../../../core/domain/repositories';
import { UniqueId } from '../../../core/domain/value-objects';
import { Wish, WishStage } from '../entities';

export interface WishRepository extends Repository<Wish> {
  getWishStageById(id: UniqueId): Promise<WishStage>;

  getAllPublicWishes(): Promise<Wish[]>;

  getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]>;
}
