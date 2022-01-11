import { PickType } from '@nestjs/swagger';
import { CreateWishDto } from '.';

export class UpdateWishDto extends PickType(CreateWishDto, [
  'id',
  'title',
  'description',
  'privacyLevel',
  'urls',
  'imageUrls',
  'categories',
  'startedAt',
  'completedAt',
]) {}
