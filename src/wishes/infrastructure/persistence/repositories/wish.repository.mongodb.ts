import {
  EntityRepository,
  MikroORM,
  Repository as MikroOrmRepository,
} from '@mikro-orm/core';
import { UniqueId } from '../../../../core/domain/value-objects';
import { Wish, WishStage } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';
import {
  wishEntityToWish,
  wishStageEntityToWishStage,
  wishStageToWishStageEntity,
  wishToWishEntity,
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
    const wishesEntities = await this.find({
      privacyLevel: PrivacyLevel.Public,
    });
    const wishes = wishesEntities.map((u) => wishEntityToWish(u));
    return wishes;
  }

  async getAllWishesByWisher(wisherId: UniqueId): Promise<Wish[]> {
    const wishesEntities = await this.find({
      wisher: { id: wisherId.getId },
    });
    const wishes = wishesEntities.map((u) => wishEntityToWish(u));
    return wishes;
  }

  async getWishByWishStageId(id: UniqueId): Promise<Wish> {
    const wishStageEntity = await this.orm.em.findOne(
      WishStageEntity,
      id.getId,
    );
    if (!wishStageEntity) return null;
    const wishEntity = wishStageEntity.wish;
    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  updateWishStage(wishStage: WishStage): void {
    const wishStageEntity = wishStageToWishStageEntity(wishStage);
    const wishStageFromDb = this.getReference(wishStage.id.getId);
    this.assign(wishStageFromDb, wishStageEntity);
  }

  deleteWishStage(id: UniqueId): void {
    const wishStageFromDb = this.orm.em.getReference(WishStageEntity, id.getId);
    this.remove(wishStageFromDb);
  }

  async getAll(): Promise<Wish[]> {
    const wishesEntities = await this.findAll();
    const wishes = wishesEntities.map((u) => wishEntityToWish(u));
    return wishes;
  }

  async getOne(id: UniqueId): Promise<Wish> {
    const wishEntity = await this.findOne(id.getId);
    if (!wishEntity) return null;
    const wish = wishEntityToWish(wishEntity);
    return wish;
  }

  add(wish: Wish): void {
    const wisherEntity = this.getOrCreateWisherEntity(wish.wisher.id);
    const wishEntity = wishToWishEntity(wish, wisherEntity);
    const wishEntityToPersist = this.create(wishEntity);
    this.persist(wishEntityToPersist);
  }

  update(wish: Wish): void {
    const wisherEntity = this.getOrCreateWisherEntity(wish.wisher.id);
    const wishEntity = wishToWishEntity(wish, wisherEntity);
    const wishFromDb = this.getReference(wish.id.getId);
    this.assign(wishFromDb, wishEntity);
  }

  delete(id: UniqueId): void {
    const wishFromDb = this.getReference(id.getId);
    this.remove(wishFromDb);
  }

  private getOrCreateWisherEntity(wisherId: UniqueId): WisherEntity {
    let wisherEntity = this.orm.em.getReference(WisherEntity, wisherId.getId);

    if (!wisherEntity) {
      wisherEntity = new WisherEntity();
      wisherEntity.id = wisherId.getId;
    }

    return wisherEntity;
  }
}