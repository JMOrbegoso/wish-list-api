import { MillisecondsDate, WebUrl } from '../../../shared/domain/value-objects';
import { WishStage, WishStageId } from '../../domain/entities';
import { WishDescription, WishTitle } from '../../domain/value-objects';
import { WishStageEntity } from '../persistence/entities';

export function wishStageEntityToWishStage(
  wishStageEntity: WishStageEntity,
): WishStage {
  const wishStageId = WishStageId.create(wishStageEntity.id);
  const title = WishTitle.create(wishStageEntity.title);
  const description = WishDescription.create(wishStageEntity.description);
  const createdAt = MillisecondsDate.createFromDate(wishStageEntity.createdAt);
  const urls = wishStageEntity.urls.map((url) => WebUrl.create(url));
  const imageUrls = wishStageEntity.imageUrls.map((url) => WebUrl.create(url));

  return WishStage.create(
    wishStageId,
    title,
    description,
    createdAt,
    urls,
    imageUrls,
  );
}
