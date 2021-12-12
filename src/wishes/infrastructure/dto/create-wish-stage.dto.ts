import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateWishDto } from '.';

export class CreateWishStageDto extends PickType(CreateWishDto, [
  'id',
  'title',
  'description',
  'urls',
  'imageUrls',
]) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Wish Stage id.',
    example: '61872ad79452fa50b7b70f80',
  })
  @IsMongoId()
  @IsNotEmpty()
  wishStageId: string;
}
