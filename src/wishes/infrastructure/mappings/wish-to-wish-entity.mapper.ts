import { Collection } from '@mikro-orm/core';
import { Wish } from '../../domain/entities';
import {
  WishEntity,
  WishStageEntity,
  WisherEntity,
} from '../persistence/entities';

export function wishToWishEntity(
  wish: Wish,
  wisherEntity: WisherEntity,
  wishStagesEntities: WishStageEntity[],
): WishEntity {
  const wishEntity = new WishEntity();

  wishEntity.id = wish.id.getId;
  wishEntity.title = wish.title.getTitle;
  wishEntity.description = wish.description.getDescription;
  wishEntity.privacyLevel = wish.privacyLevel.getPrivacyLevel;
  wishEntity.createdAt = wish.createdAt.getDate;
  wishEntity.updatedAt = wish.updatedAt.getDate;
  wishEntity.wisher = wisherEntity;
  wishEntity.urls = wish.urls.map((url) => url.getUrl);
  wishEntity.imageUrls = wish.imageUrls.map((url) => url.getUrl);
  wishEntity.categories = wish.categories.map((url) => url.getName);
  wishEntity.stages = new Collection<WishStageEntity>(
    wishEntity,
    wishStagesEntities,
  );
  wishEntity.deletedAt = wish.deletedAt?.getDate ?? null;
  wishEntity.startedAt = wish.startedAt?.getDate ?? null;
  wishEntity.completedAt = wish.completedAt?.getDate ?? null;

  return wishEntity;
}
