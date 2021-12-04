import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class LoginDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
