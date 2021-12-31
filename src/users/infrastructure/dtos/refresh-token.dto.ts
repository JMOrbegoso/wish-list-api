import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  refresh_token: string;
}
