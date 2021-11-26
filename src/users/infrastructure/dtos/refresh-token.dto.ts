import { PickType } from '@nestjs/swagger';
import { AuthTokensDto } from '.';

export class RefreshTokenDto extends PickType(AuthTokensDto, [
  'refresh_token',
]) {}
