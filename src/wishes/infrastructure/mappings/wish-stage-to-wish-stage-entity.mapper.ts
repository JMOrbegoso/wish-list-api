import { WishStage } from '../../domain/entities';
import { WishStageEntity } from '../persistence/entities';

export function wishStageToWishStageEntity(
  wishStage: WishStage,
): WishStageEntity {
  const wishStageEntity = new WishStageEntity();

  wishStageEntity.id = wishStage.id.getId;
  wishStageEntity.title = wishStage.title.getTitle;
  wishStageEntity.description = wishStage.description.getDescription;
  wishStageEntity.createdAt = wishStage.createdAt.getDate;
  wishStageEntity.urls = wishStage.urls.map((url) => url.getUrl);
  wishStageEntity.imageUrls = wishStage.imageUrls.map((url) => url.getUrl);

  return wishStageEntity;
}
