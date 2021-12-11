import { ApiProperty } from '@nestjs/swagger';

export class OutputWishStageDto {
  @ApiProperty({
    type: String,
    description: 'Wish Stage id.',
    example: '61872ad79452fa50b7b70f80',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Wish Stage title.',
    example: 'Stage 1',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Wish Stage description.',
    example: 'Stage description 1',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Wish Stage creation date in milliseconds.',
    example: 1636128526164,
  })
  createdAt: number;

  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Wish Stage urls.',
    example: ['https://www.example.com/0/', 'https://www.example.com/1/'],
  })
  urls: string[];

  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Wish Stage images.',
    example: ['https://www.example.com/0.jpg', 'https://www.example.com/1.jpg'],
  })
  imageUrls: string[];
}
