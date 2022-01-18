import { WishStage } from '../../domain/entities';
import { OutputWishStageDto } from '../dtos';

export function wishStageToOutputWishStageDto(
  wishStage: WishStage,
): OutputWishStageDto {
  const dto = new OutputWishStageDto();

  dto.id = wishStage.id.value.toString();
  dto.title = wishStage.title.getTitle;
  dto.description = wishStage.description.getDescription;
  dto.createdAt = wishStage.createdAt.getIso8601;
  dto.urls = wishStage.urls.map((url) => url.getUrl);
  dto.imageUrls = wishStage.imageUrls.map((imageUrl) => imageUrl.getUrl);

  return dto;
}
