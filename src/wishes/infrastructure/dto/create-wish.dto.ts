import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Wish } from '../../domain/entities';
import {
  CategoryName,
  PrivacyLevel,
  WishDescription,
  WishTitle,
} from '../../domain/value-objects';

export class CreateWishDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Wish id.',
    example: '61872ad79452fa50b7b70f80',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Wish title.',
    example: 'New Laptop',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(WishTitle.MaxLength)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Wish description.',
    example: 'A brand new laptop.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(WishDescription.MaxLength)
  description: string;

  @ApiProperty({
    enum: [PrivacyLevel.Public, PrivacyLevel.JustFriends, PrivacyLevel.OnlyMe],
    enumName: 'PrivacyLevel',
    required: true,
    description: 'Wish privacy level.',
    example: PrivacyLevel.Public,
  })
  @IsEnum(PrivacyLevel)
  privacyLevel: PrivacyLevel;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Wisher id.',
    example: '61872ad79452fa50b7b70f80',
  })
  @IsMongoId()
  @IsNotEmpty()
  wisherId: string;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Wish urls',
    example: ['https://www.example.com'],
  })
  @IsArray()
  @ArrayMaxSize(Wish.MaxUrls)
  @IsString({ each: true })
  urls: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Wish image urls',
    example: ['https://www.example.com/1.jpg'],
  })
  @IsArray()
  @ArrayMaxSize(Wish.MaxImages)
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Wish categories.',
    example: ['Tech'],
  })
  @IsArray()
  @ArrayMaxSize(Wish.MaxCategories)
  @IsString({ each: true })
  @MaxLength(CategoryName.MaxLength, { each: true })
  categories: string[];
}
