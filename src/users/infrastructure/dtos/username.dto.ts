import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UsernameDto extends PickType(CreateUserDto, ['username']) {}
