import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CreateWishDto } from '.';

export class CompleteWishDto extends PickType(CreateWishDto, ['id']) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Wish completion date in milliseconds.',
    example: '1638123780283',
  })
  @IsNumberString()
  @IsNotEmpty()
  completionDate: string;
}
