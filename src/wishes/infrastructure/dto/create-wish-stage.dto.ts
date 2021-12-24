import { PickType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateWishDto } from '.';

export class CreateWishStageDto extends PickType(CreateWishDto, [
  'id',
  'title',
  'description',
  'urls',
  'imageUrls',
]) {
  @IsMongoId()
  @IsNotEmpty()
  wishStageId: string;
}
