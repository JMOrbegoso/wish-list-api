import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(userId: string): Promise<AuthTokensDto> {
    const payload = { sub: userId };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = '';

    return {
      access_token,
      refresh_token,
    };
  }
}
