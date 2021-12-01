import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../application/services';

@Injectable()
export class TokenServiceJwt implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signPayload(payload: string | Buffer | object): string {
    return this.jwtService.sign(payload);
  }
}
