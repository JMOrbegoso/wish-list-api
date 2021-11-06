import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsPositive,
  Matches,
} from 'class-validator';
import {
  UserName,
  Password,
  FirstName,
  LastName,
  Biography,
} from '../../../users/domain/value-objects';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email of the new user.',
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'UserName of the new user.',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserName.MaxLength)
  userName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Password of the new user.',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(Password.MaxLength)
  @MinLength(Password.MinLength)
  @Matches(Password.Regex, {
    message:
      'The password must have at least one number, one capital letter, and one symbol.',
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'First name of the new user.',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(FirstName.MaxLength)
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Last name of the new user.',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(LastName.MaxLength)
  lastName: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Birthday in milliseconds of the new user.',
    example: 1636128526164,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  birthday: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Biography of the new user.',
    example: 'A nice person.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(Biography.MaxLength)
  biography: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Profile picture url of the new user.',
    example: 'https://www.example.com',
  })
  @IsOptional()
  @IsUrl()
  @IsString()
  profilePicture: string;
}
