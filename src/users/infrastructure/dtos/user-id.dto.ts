import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UserIdDto extends PickType(CreateUserDto, ['id']) {}
