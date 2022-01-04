import {
  EntityData,
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { Wish, WishStage, Wisher } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';
import {
  wishEntityToWish,
  wishStageEntityToWishStage,
  wisherEntityToWisher,
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

  addWish(wish: Wish): void {
    const newValues = this.wishEntityValues(wish);
    const newWishEntity = this.create(newValues);
    this.orm.em.persist(newWishEntity);
  }

  updateWish(wish: Wish): void {
    const wishEntityFromDb = this.getReference(wish.id.getId);
    const newValues = this.wishEntityValues(wish);
    this.orm.em.assign(wishEntityFromDb, newValues);
  }

  async getWisherById(id: UniqueId): Promise<Wisher> {
    const wisherEntity = await this.orm.em.findOne(WisherEntity, id.getId);
    if (!wisherEntity) return null;
    const wisher = wisherEntityToWisher(wisherEntity);
    return wisher;
  }

  addWisher(wisher: Wisher): void {
    const newValues = this.wisherEntityValues(wisher);
    const wisherEntity = this.orm.em.create(WisherEntity, newValues);
    this.orm.em.persist(wisherEntity);
  }

  updateWisher(wisher: Wisher): void {
    const wisherEntityFromDb = this.orm.em.getReference(
      WisherEntity,
      wisher.id.getId,
    );
    const newValues = this.wisherEntityValues(wisher);
    this.orm.em.assign(wisherEntityFromDb, newValues);
  }

  async getWishStageById(id: UniqueId): Promise<WishStage> {
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      id.getId,
    );
    if (!wishStageEntity) return null;
    const wishStage = wishStageEntityToWishStage(wishStageEntity);
    return wishStage;
  }

  addWishStage(wishStage: WishStage, wishId: UniqueId): void {
    const newValues = this.wishStageEntityValues(wishStage, wishId);
    const wishStageEntity = this.orm.em.create(WishStageEntity, newValues);
    this.orm.em.persist(wishStageEntity);
  }

  updateWishStage(wishStage: WishStage, wishId: UniqueId): void {
    const wishStageEntityFromDb = this.orm.em.getReference(
      WishStageEntity,
      wishStage.id.getId,
    );
    const newValues = this.wishStageEntityValues(wishStage, wishId);
    this.orm.em.assign(wishStageEntityFromDb, newValues);
  }

  deleteWishStage(id: UniqueId): void {
    const wishStageFromDb = this.orm.em.getReference(WishStageEntity, id.getId);
    this.remove(wishStageFromDb);
  }

  private wishEntityValues(wish: Wish): EntityData<WishEntity> {
    return {
      id: wish.id.getId,
      title: wish.title.getTitle,
      description: wish.description.getDescription,
      privacyLevel: wish.privacyLevel.getPrivacyLevel,
      createdAt: wish.createdAt.getDate,
      updatedAt: wish.updatedAt.getDate,
      wisher: new ObjectId(wish.wisher.id.getId),
      urls: wish.urls.map((u) => u.getUrl),
      imageUrls: wish.imageUrls.map((i) => i.getUrl),
      categories: wish.categories.map((c) => c.getName),
      deletedAt: wish.deletedAt?.getDate ?? null,
      startedAt: wish.startedAt?.getDate ?? null,
      completedAt: wish.completedAt?.getDate ?? null,
    };
  }

  private wisherEntityValues(wisher: Wisher): EntityData<WisherEntity> {
    return {
      id: wisher.id.getId,
    };
  }

  private wishStageEntityValues(
    wishStage: WishStage,
    wishId: UniqueId,
  ): EntityData<WishStageEntity> {
    return {
      id: wishStage.id.getId,
      wish: new ObjectId(wishId.getId),
      title: wishStage.title.getTitle,
      description: wishStage.description.getDescription,
      createdAt: wishStage.createdAt.getDate,
      urls: wishStage.urls.map((u) => u.getUrl),
      imageUrls: wishStage.imageUrls.map((i) => i.getUrl),
    };
  }
}
