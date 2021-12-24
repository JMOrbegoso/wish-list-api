import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { Wish, WishStage } from '../entities';

export abstract class WishRepository implements Repository<Wish> {
  abstract getWishStageById(wishStageId: UniqueId): Promise<WishStage>;

  abstract getAllPublicWishes(): Promise<Wish[]>;

  abstract getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]>;

  abstract getWishByWishStageId(id: UniqueId): Promise<Wish>;

  abstract getAll(): Promise<Wish[]>;

  abstract getOne(id: UniqueId): Promise<Wish>;

  abstract add(wish: Wish): void;

  abstract update(wish: Wish): void;
}
