import {
  Wish,
  WishId,
  WishStage,
  WishStageId,
  Wisher,
  WisherId,
} from '../entities';

export abstract class WishRepository {
  abstract getAllPublicWishes(): Promise<Wish[]>;

  abstract getAllWishesByWisher(wisherId: WisherId): Promise<Wish[]>;

  abstract getWishByWishStageId(id: WishStageId): Promise<Wish>;

  abstract getAll(): Promise<Wish[]>;

  abstract getOneById(id: WishId): Promise<Wish>;

  abstract addWish(wish: Wish): void;
  abstract updateWish(wish: Wish): void;

  abstract getWisherById(id: WisherId): Promise<Wisher>;
  abstract addWisher(wisher: Wisher): void;
  abstract updateWisher(wisher: Wisher): void;

  abstract getWishStageById(id: WishStageId): Promise<WishStage>;
  abstract addWishStage(wishStage: WishStage, wishId: WishId): void;
  abstract updateWishStage(wishStage: WishStage): void;
  abstract deleteWishStage(id: WishStageId): void;
}
