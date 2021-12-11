import { PickType } from '@nestjs/swagger';
import { CreateWishStageDto } from '.';

export class WishStageIdDto extends PickType(CreateWishStageDto, [
  'wishStageId',
]) {}
