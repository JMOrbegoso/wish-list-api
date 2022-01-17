import { Wish } from '../../domain/entities';
import { OutputWishDto } from '../dtos';
import { wishStageToOutputWishStageDto } from '.';

export function wishToOutputWishDto(wish: Wish): OutputWishDto {
  const dto = new OutputWishDto();

  dto.id = wish.id.value.toString();
  dto.title = wish.title.getTitle;
  dto.description = wish.description.getDescription;
  dto.privacyLevel = wish.privacyLevel.getPrivacyLevel;
  dto.createdAt = wish.createdAt.getIso8601;
  dto.updatedAt = wish.updatedAt.getIso8601;
  dto.wisherId = wish.wisher.id.value.toString();
  dto.urls = wish.urls.map((url) => url.getUrl);
  dto.imageUrls = wish.imageUrls.map((imageUrl) => imageUrl.getUrl);
  dto.categories = wish.categories.map((category) => category.getName);
  dto.stages = wish.stages.map((stage) => wishStageToOutputWishStageDto(stage));
  dto.deletedAt = wish.deletedAt?.getIso8601 ?? null;
  dto.startedAt = wish.startedAt?.getIso8601 ?? null;
  dto.completedAt = wish.completedAt?.getIso8601 ?? null;

  return dto;
}
