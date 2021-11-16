import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'userName',
  'password',
]) {}
