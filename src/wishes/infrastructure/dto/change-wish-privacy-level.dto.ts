import { PickType } from '@nestjs/swagger';
import { CreateWishDto } from '.';

export class ChangeWishPrivacyLevelDto extends PickType(CreateWishDto, [
  'id',
  'privacyLevel',
]) {}
