import { Collection } from '@mikro-orm/core';
import { Wish } from '../../domain/entities';
import { WishEntity, WishStageEntity } from '../persistence/entities';
import { wishStageToWishStageEntity, wisherToWisherEntity } from '.';

export function wishToWishEntity(wish: Wish): WishEntity {
  const wishEntity = new WishEntity();

  wishEntity.id = wish.id.getId;
  wishEntity.title = wish.title.getTitle;
  wishEntity.description = wish.description.getDescription;
  wishEntity.privacyLevel = wish.privacyLevel.getPrivacyLevel;
  wishEntity.createdAt = wish.createdAt.getDate;
  wishEntity.updatedAt = wish.updatedAt.getDate;
  wishEntity.wisher = wisherToWisherEntity(wish.wisher);
  wishEntity.urls = wish.urls.map((url) => url.getUrl);
  wishEntity.imageUrls = wish.imageUrls.map((url) => url.getUrl);
  wishEntity.categories = wish.categories.map((url) => url.getName);
  wishEntity.stages = new Collection<WishStageEntity>(
    WishEntity,
    wish.stages.map((stage) => wishStageToWishStageEntity(stage)),
  );
  wishEntity.deletedAt = wish.deletedAt?.getDate ?? null;
  wishEntity.completedAt = wish.completedAt?.getDate ?? null;

  return wishEntity;
}