import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CreateWishDto } from '.';

export class CompleteWishDto extends PickType(CreateWishDto, ['id']) {
  @IsNumberString()
  @IsNotEmpty()
  completionDate: string;
}
