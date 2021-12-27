import { PickType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateWishDto } from '.';

export class CreateWishStageDto extends PickType(CreateWishDto, [
  'title',
  'description',
  'urls',
  'imageUrls',
]) {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  wishId: string;
}
