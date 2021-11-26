import { PickType } from '@nestjs/swagger';
import { AuthTokensDto } from '.';

export class AccessTokenDto extends PickType(AuthTokensDto, ['access_token']) {}
