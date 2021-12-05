import { ApiProperty } from '@nestjs/swagger';
import { PrivacyLevel } from '../../../wishes/domain/value-objects';
import { OutputWishStageDto } from '.';

export class OutputWishDto {
  @ApiProperty({
    type: String,
    description: 'Wish id.',
    example: '61872ad79452fa50b7b70f80',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Wish title.',
    example: 'High-End Laptop',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Wish description.',
    example: 'A nice laptop.',
  })
  description: string;

  @ApiProperty({
    type: String,
    enumName: 'Privacy level.',
    enum: ['Public', 'JustFriends', 'OnlyMe'],
    description: 'Wish privacy level.',
  })
  privacyLevel: PrivacyLevel;

  @ApiProperty({
    type: Number,
    description: 'Wish creation date in milliseconds.',
    example: 1636128526164,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    description: 'Wish update date in milliseconds.',
    example: 1636128526164,
  })
  updatedAt: number;

  @ApiProperty({
    type: String,
    description: 'Wisher id.',
    example: '61872ad79452fa50b7b70f80',
  })
  wisherId: string;

  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Wish urls.',
    example: ['https://www.example.com/0/', 'https://www.example.com/1/'],
  })
  urls: string[];

  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Wish images.',
    example: ['https://www.example.com/0.jpg', 'https://www.example.com/1.jpg'],
  })
  imageUrls: string[];

  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Wish categories.',
    example: ['Tech', 'Shopping'],
  })
  categories: string[];

  @ApiProperty({
    type: [OutputWishStageDto],
    isArray: true,
    description: 'Wish stages.',
  })
  stages: OutputWishStageDto[];

  @ApiProperty({
    type: Number,
    description: 'Wish delete date in milliseconds.',
    example: 1636128526164,
  })
  deletedAt?: number;

  @ApiProperty({
    type: Number,
    description: 'Wish completion date in milliseconds.',
    example: 1636128526164,
  })
  completedAt?: number;
}
