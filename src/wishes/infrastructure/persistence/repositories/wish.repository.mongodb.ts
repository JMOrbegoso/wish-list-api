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

  async getOneById(id: UniqueId): Promise<Wish> {
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

  async update(wish: Wish): Promise<void> {
    const wishFromDb = await this.findOne(wish.id.getId, { populate: true });

    // Update stages
    const stagesToUpdate = wish.stages.filter((stage) =>
      wishFromDb.stages
        .getItems()
        .some((stageDb) => stage.id.getId === stageDb.id),
    );
    const stagesToAdd = wish.stages.filter(
      (stage) =>
        !stagesToUpdate.some((stageToUpdate) => stage.id === stageToUpdate.id),
    );
    const stagesToDelete = wishFromDb.stages
      .getItems()
      .filter(
        (stageDb) =>
          !stagesToUpdate.some((stage) => stage.id.getId === stageDb.id),
      );

    // Persist wish stages to add
    stagesToAdd.forEach((stage) => this.persistNewWishStage(stage, wishFromDb));

    // Persist wish stages to update
    stagesToUpdate.forEach((stage) => this.updateWishStageFromPersist(stage));

    // Persist wish stages to delete
    stagesToDelete.forEach((stage) => this.deleteWishStageFromPersist(stage));

    // Update wish
    const wisherEntity = this.getOrCreateWisherEntity(wish.wisher);
    const wishEntity = wishToWishEntity(wish, wisherEntity, []);
    this.assign(wishFromDb, wishEntity);
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

  private persistNewWishStage(stage: WishStage, wishFromDb: WishEntity): void {
    const stageEntity = wishStageToWishStageEntity(stage);
    wishFromDb.stages.add(stageEntity);
    this.orm.em.persist(stageEntity);
  }

  private updateWishStageFromPersist(stage: WishStage): void {
    const stageReference = this.orm.em.getReference(
      WishStageEntity,
      stage.id.getId,
    );
    this.orm.em.assign(stageReference, wishStageToWishStageEntity(stage));
  }

  private deleteWishStageFromPersist(stageEntity: WishStageEntity): void {
    const wishStageFromDb = this.orm.em.getReference(
      WishStageEntity,
      stageEntity.id,
    );

    this.remove(wishStageFromDb);
  }
}
