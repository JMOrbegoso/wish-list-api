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
  IsMongoId,
} from 'class-validator';
import {
  Username,
  Password,
  FirstName,
  LastName,
  Biography,
} from '../../../users/domain/value-objects';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User id.',
    example: '61872ad79452fa50b7b70f80',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User email.',
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User UserName.',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(Username.MaxLength)
  @MinLength(Username.MinLength)
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User password.',
    example: 'Pa$$w0rd',
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
    description: 'User first name.',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(FirstName.MaxLength)
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User last name.',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(LastName.MaxLength)
  lastName: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'User birthday in milliseconds.',
    example: 1636128526164,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  birthday: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User biography.',
    example: 'A nice person.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(Biography.MaxLength)
  biography: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'User profile picture url.',
    example: 'https://www.example.com',
  })
  @IsOptional()
  @IsUrl()
  @IsString()
  profilePicture: string;
}
