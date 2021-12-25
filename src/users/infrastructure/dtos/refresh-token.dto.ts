import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsMongoId()
  @IsNotEmpty()
  refresh_token: string;
}
