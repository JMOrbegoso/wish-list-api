import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UserNameDto extends PickType(CreateUserDto, ['userName']) {}
