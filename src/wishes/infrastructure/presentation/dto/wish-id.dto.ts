import { PickType } from '@nestjs/swagger';
import { CreateWishDto } from '.';

export class WishIdDto extends PickType(CreateWishDto, ['id']) {}
