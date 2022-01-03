import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Biography,
  FirstName,
  LastName,
  Password,
  Username,
} from '../../domain/value-objects';

export class CreateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(Username.MaxLength)
  @MinLength(Username.MinLength)
  @Matches(Username.Regex, {
    message: 'username contains invalid characters.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(Password.MaxLength)
  @MinLength(Password.MinLength)
  @Matches(Password.Regex, {
    message:
      'The password must have at least one number, one capital letter, and one symbol.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(FirstName.MaxLength)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(LastName.MaxLength)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  birthday: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(Biography.MaxLength)
  biography: string;
}
