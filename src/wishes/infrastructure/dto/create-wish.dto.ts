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
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(WishTitle.MaxLength)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(WishDescription.MaxLength)
  description: string;

  @IsEnum(PrivacyLevel)
  privacyLevel: PrivacyLevel;

  @IsMongoId()
  @IsNotEmpty()
  wisherId: string;

  @IsArray()
  @ArrayMaxSize(Wish.MaxUrls)
  @IsString({ each: true })
  urls: string[];

  @IsArray()
  @ArrayMaxSize(Wish.MaxImages)
  @IsString({ each: true })
  imageUrls: string[];

  @IsArray()
  @ArrayMaxSize(Wish.MaxCategories)
  @IsString({ each: true })
  @MaxLength(CategoryName.MaxLength, { each: true })
  categories: string[];
}
