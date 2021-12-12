import { PickType } from '@nestjs/swagger';
import { CreateWishStageDto } from '.';

export class UpdateWishStageDto extends PickType(CreateWishStageDto, [
  'wishStageId',
  'title',
  'description',
  'urls',
  'imageUrls',
]) {}
