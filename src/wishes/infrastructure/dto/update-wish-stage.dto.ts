import { PickType } from '@nestjs/swagger';
import { CreateWishStageDto } from '.';

export class UpdateWishStageDto extends PickType(CreateWishStageDto, [
  'id',
  'title',
  'description',
  'urls',
  'imageUrls',
]) {}
