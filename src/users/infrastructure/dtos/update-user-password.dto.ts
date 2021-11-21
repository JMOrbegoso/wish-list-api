import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'id',
  'password',
]) {}
