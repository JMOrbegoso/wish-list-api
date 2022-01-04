import { Repository } from '../../../shared/domain/repositories';
import { UniqueId } from '../../../shared/domain/value-objects';
import { Wish, WishStage, Wisher } from '../entities';

export abstract class WishRepository implements Repository<Wish> {
  abstract getWishStageById(wishStageId: UniqueId): Promise<WishStage>;

  abstract getAllPublicWishes(): Promise<Wish[]>;

  abstract getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]>;

  abstract getWishByWishStageId(id: UniqueId): Promise<Wish>;

  abstract getAll(): Promise<Wish[]>;

  abstract getOneById(id: UniqueId): Promise<Wish>;

  abstract addWish(wish: Wish): void;
  abstract updateWish(wish: Wish): void;

  abstract getWisherById(id: UniqueId): Promise<Wisher>;
  abstract addWisher(wisher: Wisher): void;
  abstract updateWisher(wisher: Wisher): void;
}
