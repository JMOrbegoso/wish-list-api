import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { DateTime } from '../../../shared/domain/value-objects';
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

  @IsMongoId()
  @IsNotEmpty()
  wisherId: string;

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

  @IsString()
  @Matches(DateTime.Iso8601Regex, {
    message: 'startedAt must be a valid ISO 8601 date string',
  })
  @IsOptional()
  startedAt: string;

  @IsString()
  @Matches(DateTime.Iso8601Regex, {
    message: 'completedAt must be a valid ISO 8601 date string',
  })
  @IsOptional()
  completedAt: string;
}
