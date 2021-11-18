import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UserEmailDto extends PickType(CreateUserDto, ['email']) {}
