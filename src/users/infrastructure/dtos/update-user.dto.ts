import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '.';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'userName',
  'password',
]) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User id.',
    example: '61872ad79452fa50b7b70f80',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
