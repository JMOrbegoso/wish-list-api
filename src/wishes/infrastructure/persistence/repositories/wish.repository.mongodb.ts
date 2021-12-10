import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UniqueId } from '../../../../core/domain/value-objects';
import { Wish, WishStage, Wisher } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';
import {
  wishEntityToWish,
  wishStageEntityToWishStage,
  wishStageToWishStageEntity,
  wishToWishEntity,
  wisherToWisherEntity,
} from '../../mappings';
import { WishEntity, WishStageEntity, WisherEntity } from '../entities';

@MikroOrmRepository(WishEntity)
export class WishRepositoryMongoDb
  extends EntityRepository<WishEntity>
  implements WishRepository
{
  constructor(private readonly orm: MikroORM) {
    super(orm.em, WishEntity);
  }

  async getWishStageById(wishStageId: UniqueId): Promise<WishStage> {
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      wishStageId.getId,
    );
    if (!wishStageEntity) return null;
    const wishStage = wishStageEntityToWishStage(wishStageEntity);
    return wishStage;
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

  async getOne(id: UniqueId): Promise<Wish> {
    const wishEntity = await this.findOne(id.getId, { populate: true });
    if (!wishEntity) return null;
    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  add(wish: Wish): void {
    const wisherEntity = this.getOrCreateWisherEntity(wish.wisher);
    const wishStagesEntities = wish.stages.map((stage) =>
      this.getOrCreateWishStageEntity(stage),
    );
    const wishEntity = wishToWishEntity(wish, wisherEntity, wishStagesEntities);
    const wishEntityToPersist = this.create(wishEntity);
    this.persist(wishEntityToPersist);
  }

  update(wish: Wish): void {
    const wisherEntity = this.getOrCreateWisherEntity(wish.wisher);
    const wishStagesEntities = wish.stages.map((stage) =>
      this.getOrCreateWishStageEntity(stage),
    );
    const wishEntity = wishToWishEntity(wish, wisherEntity, wishStagesEntities);
    const wishFromDb = this.getReference(wish.id.getId);
    this.assign(wishFromDb, wishEntity);
  }

  delete(id: UniqueId): void {
    const wishFromDb = this.getReference(id.getId);
    this.remove(wishFromDb);
  }

  private getOrCreateWisherEntity(wisher: Wisher): WisherEntity {
    let wisherEntity = this.orm.em.getReference(WisherEntity, wisher.id.getId);

    if (!wisherEntity) {
      wisherEntity = wisherToWisherEntity(wisher);
    }

    return wisherEntity;
  }

  private getOrCreateWishStageEntity(wishStage: WishStage): WishStageEntity {
    let wishStageEntity = this.orm.em.getReference(
      WishStageEntity,
      wishStage.id.getId,
    );

    if (!wishStageEntity) {
      wishStageEntity = wishStageToWishStageEntity(wishStage);
    }

    return wishStageEntity;
  }
}
