import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email of the new user.',
    example: 'john@doe.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'UserName of the new user.',
    example: 'john_doe',
  })
  userName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Password of the new user.',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'First name of the new user.',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Last name of the new user.',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Birthday in milliseconds of the new user.',
    example: 1636128526164,
  })
  birthday: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Biography of the new user.',
    example: 'A nice person.',
  })
  biography: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Profile picture url of the new user.',
    example: 'https://www.example.com',
  })
  profilePicture: string;
}
