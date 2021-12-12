import { PickType } from '@nestjs/swagger';
import { CreateWishDto } from '.';

export class WisherIdDto extends PickType(CreateWishDto, ['wisherId']) {}
