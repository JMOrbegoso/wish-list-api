import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '.';

export class UpdateUserProfileDto extends OmitType(CreateUserDto, [
  'email',
  'userName',
  'password',
]) {}
