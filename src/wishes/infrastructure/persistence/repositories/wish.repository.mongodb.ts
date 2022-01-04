import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { Wish, WishStage, Wisher } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';
import { wishEntityToWish, wishStageEntityToWishStage } from '../../mappings';
import { WishEntity, WishStageEntity } from '../entities';

@MikroOrmRepository(WishEntity)
export class WishRepositoryMongoDb
  extends EntityRepository<WishEntity>
  implements WishRepository
{
  constructor(private readonly orm: MikroORM) {
    super(orm.em, WishEntity);
  }

  async getAllPublicWishes(): Promise<Wish[]> {
    const wishesEntities = await this.find(
      {
        privacyLevel: PrivacyLevel.Public,
      },
      { populate: true },
    );
    const wishes = wishesEntities.map((u) => wishEntityToWish(u));
    return wishes;
  }

  async getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]> {
    const wishesEntities = await this.find(
      {
        wisher: { _id: new ObjectId(wisherId.getId) },
      },
      { populate: true },
    );
    const wishes = wishesEntities.map((w) => wishEntityToWish(w));
    return wishes;
  }

  async getWishByWishStageId(id: UniqueId): Promise<Wish> {
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      id.getId,
      { populate: true },
    );

    if (!wishStageEntity) return null;
    const wishEntity = wishStageEntity.wish.getEntity();

    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  async getAll(): Promise<Wish[]> {
    const wishesEntities = await this.findAll({ populate: true });
    const wishes = wishesEntities.map((u) => wishEntityToWish(u));
    return wishes;
  }

  async getOneById(id: UniqueId): Promise<Wish> {
    const wishEntity = await this.findOne(id.getId, { populate: true });
    if (!wishEntity) return null;
    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  addWish(wish: Wish): void {}

  updateWish(wish: Wish): void {}

  async getWisherById(id: UniqueId): Promise<Wisher> {}

  addWisher(wisher: Wisher): void {}

  updateWisher(wisher: Wisher): void {}

  async getWishStageById(id: UniqueId): Promise<WishStage> {
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      id.getId,
    );
    if (!wishStageEntity) return null;
    const wishStage = wishStageEntityToWishStage(wishStageEntity);
    return wishStage;
  }

  addWishStage(wishStage: WishStage): void {}

  updateWishStage(wishStage: WishStage): void {}

  deleteWishStage(id: UniqueId): void {}
}
