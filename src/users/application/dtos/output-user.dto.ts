import { ApiProperty } from '@nestjs/swagger';

export class OutputUserDto {
  @ApiProperty({
    type: String,
    description: 'User id.',
    example: '61872ad79452fa50b7b70f80',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'User email.',
    example: 'john@doe.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User UserName.',
    example: 'john_doe',
  })
  userName: string;

  @ApiProperty({
    type: Boolean,
    description: 'User verification status.',
    example: true,
  })
  isVerified: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'User block status.',
    example: true,
  })
  isBlocked: boolean;

  @ApiProperty({
    type: String,
    description: 'User first name.',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'User last name.',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    type: Number,
    description: 'User birthday in milliseconds.',
    example: 1636128526164,
  })
  birthday: number;

  @ApiProperty({
    type: Number,
    description: 'User createdAt date in milliseconds.',
    example: 1636128526164,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    description: 'User updatedAt date in milliseconds.',
    example: 1636128526164,
  })
  updatedAt: number;

  @ApiProperty({
    type: String,
    description: 'User biography.',
    example: 'A nice person.',
  })
  biography: string;

  @ApiProperty({
    type: String,
    description: 'User profile picture url.',
    example: 'https://www.example.com',
  })
  profilePicture: string;

  @ApiProperty({
    type: Number,
    description: 'User deletedAt date in milliseconds.',
    example: 1636128526164,
  })
  deletedAt: number;
}
