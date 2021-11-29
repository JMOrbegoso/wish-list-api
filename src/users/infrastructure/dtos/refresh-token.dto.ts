import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Refresh Token',
    example: '61a0f44512c57626e239724a',
  })
  @IsMongoId()
  @IsNotEmpty()
  refresh_token: string;
}
