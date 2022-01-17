import { DateTime, WebUrl } from '../../../shared/domain/value-objects';
import { Wish, WishId } from '../../domain/entities';
import {
  CategoryName,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../domain/value-objects';
import { WishEntity, WishStageEntity } from '../persistence/entities';
import { wishStageEntityToWishStage, wisherEntityToWisher } from '.';

export function wishEntityToWish(wishEntity: WishEntity): Wish {
  const wishId = WishId.create(wishEntity.id);
  const title = WishTitle.create(wishEntity.title);
  const description = WishDescription.create(wishEntity.description);
  const privacyLevel = WishPrivacyLevel.create(wishEntity.privacyLevel);
  const createdAt = DateTime.createFromDate(wishEntity.createdAt);
  const updatedAt = DateTime.createFromDate(wishEntity.updatedAt);
  const wisher = wisherEntityToWisher(wishEntity.wisher);
  const urls = wishEntity.urls.map((url) => WebUrl.create(url));
  const imageUrls = wishEntity.imageUrls.map((url) => WebUrl.create(url));
  const categories = wishEntity.categories.map((category) =>
    CategoryName.create(category),
  );
  const stages = wishEntity.stages
    .toArray()
    .map((stage: WishStageEntity) => wishStageEntityToWishStage(stage));
  const deletedAt = wishEntity.deletedAt
    ? DateTime.createFromDate(wishEntity.deletedAt)
    : null;
  const startedAt = wishEntity.startedAt
    ? DateTime.createFromDate(wishEntity.startedAt)
    : null;
  const completedAt = wishEntity.completedAt
    ? DateTime.createFromDate(wishEntity.completedAt)
    : null;

  return Wish.create(
    wishId,
    title,
    description,
    privacyLevel,
    createdAt,
    updatedAt,
    wisher,
    urls,
    imageUrls,
    categories,
    stages,
    deletedAt,
    startedAt,
    completedAt,
  );
}
