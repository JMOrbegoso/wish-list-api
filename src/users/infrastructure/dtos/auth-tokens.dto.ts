import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AuthTokensDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg3MmFkNzk0NTJmYTUwYjdiNzBmODAiLCJpYXQiOjE2Mzc4OTAxMTEsImV4cCI6MTYzNzg5MDE3MX0.nYTu6-9saedMCzPx76Y2bHVDgiH_kgybajJR7VB3584',
  })
  access_token: string;

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
