import {
  EntityData,
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import {
  Wish,
  WishId,
  WishStage,
  WishStageId,
  Wisher,
  WisherId,
} from '../../../domain/entities';
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

  async getAllWishesByWisher(wisherId: WisherId): Promise<Wish[]> {
    const wisherObjectId = new ObjectId(wisherId.value);
    const wishesEntities = await this.find(
      {
        wisher: { _id: wisherObjectId },
      },
      { populate: true },
    );
    const wishes = wishesEntities.map((w) => wishEntityToWish(w));
    return wishes;
  }

  async getWishByWishStageId(id: WishStageId): Promise<Wish> {
    const wishStageObjectId = new ObjectId(id.value);
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      wishStageObjectId,
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

  async getOneById(id: WishId): Promise<Wish> {
    const wishObjectId = new ObjectId(id.value);
    const wishEntity = await this.findOne(wishObjectId, {
      populate: true,
    });
    if (!wishEntity) return null;
    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  addWish(wish: Wish): void {
    const wisherObjectId = new ObjectId(wish.wisher.id.value);
    const newValues: EntityData<WishEntity> = {
      id: wish.id.value,
      title: wish.title.getTitle,
      description: wish.description.getDescription,
      privacyLevel: wish.privacyLevel.getPrivacyLevel,
      createdAt: wish.createdAt.getDate,
      updatedAt: wish.updatedAt.getDate,
      wisher: wisherObjectId,
      urls: wish.urls.map((u) => u.getUrl),
      imageUrls: wish.imageUrls.map((i) => i.getUrl),
      categories: wish.categories.map((c) => c.getName),
      deletedAt: wish.deletedAt?.getDate ?? null,
      startedAt: wish.startedAt?.getDate ?? null,
      completedAt: wish.completedAt?.getDate ?? null,
    };
    const newWishEntity = this.create(newValues);
    this.orm.em.persist(newWishEntity);
  }

  updateWish(wish: Wish): void {
    const wishObjectId = new ObjectId(wish.id.value);
    const wishEntityFromDb = this.getReference(wishObjectId);
    const newValues: EntityData<WishEntity> = {
      title: wish.title.getTitle,
      description: wish.description.getDescription,
      privacyLevel: wish.privacyLevel.getPrivacyLevel,
      updatedAt: wish.updatedAt.getDate,
      urls: wish.urls.map((u) => u.getUrl),
      imageUrls: wish.imageUrls.map((i) => i.getUrl),
      categories: wish.categories.map((c) => c.getName),
      deletedAt: wish.deletedAt?.getDate ?? null,
      startedAt: wish.startedAt?.getDate ?? null,
      completedAt: wish.completedAt?.getDate ?? null,
    };
    this.orm.em.assign(wishEntityFromDb, newValues);
  }

  async getWisherById(id: WisherId): Promise<Wisher> {
    const wisherObjectId = new ObjectId(id.value);
    const wisherEntity = await this.orm.em.findOne(
      WisherEntity,
      wisherObjectId,
    );
    if (!wisherEntity) return null;
    const wisher = wisherEntityToWisher(wisherEntity);
    return wisher;
  }

  addWisher(wisher: Wisher): void {
    const newValues: EntityData<WisherEntity> = {
      id: wisher.id.value,
    };
    const wisherEntity = this.orm.em.create(WisherEntity, newValues);
    this.orm.em.persist(wisherEntity);
  }

  updateWisher(wisher: Wisher): void {
    const wisherObjectId = new ObjectId(wisher.id.value);
    const wisherEntityFromDb = this.orm.em.getReference(
      WisherEntity,
      wisherObjectId,
    );
    const newValues: EntityData<WisherEntity> = {};
    this.orm.em.assign(wisherEntityFromDb, newValues);
  }

  async getWishStageById(id: WishStageId): Promise<WishStage> {
    const wishStageObjectId = new ObjectId(id.value);
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      wishStageObjectId,
    );
    if (!wishStageEntity) return null;
    const wishStage = wishStageEntityToWishStage(wishStageEntity);
    return wishStage;
  }

  addWishStage(wishStage: WishStage, wishId: WishId): void {
    const wishObjectId = new ObjectId(wishId.value);
    const newValues: EntityData<WishStageEntity> = {
      id: wishStage.id.value,
      wish: wishObjectId,
      title: wishStage.title.getTitle,
      description: wishStage.description.getDescription,
      createdAt: wishStage.createdAt.getDate,
      urls: wishStage.urls.map((u) => u.getUrl),
      imageUrls: wishStage.imageUrls.map((i) => i.getUrl),
    };
    const wishStageEntity = this.orm.em.create(WishStageEntity, newValues);
    this.orm.em.persist(wishStageEntity);
  }

  updateWishStage(wishStage: WishStage): void {
    const wishStageObjectId = new ObjectId(wishStage.id.value);
    const wishStageEntityFromDb = this.orm.em.getReference(
      WishStageEntity,
      wishStageObjectId,
    );
    const newValues: EntityData<WishStageEntity> = {
      title: wishStage.title.getTitle,
      description: wishStage.description.getDescription,
      urls: wishStage.urls.map((u) => u.getUrl),
      imageUrls: wishStage.imageUrls.map((i) => i.getUrl),
    };
    this.orm.em.assign(wishStageEntityFromDb, newValues);
  }

  deleteWishStage(id: WishStageId): void {
    const wishStageObjectId = new ObjectId(id.value);
    const wishStageFromDb = this.orm.em.getReference(
      WishStageEntity,
      wishStageObjectId,
    );
    this.remove(wishStageFromDb);
  }
}
