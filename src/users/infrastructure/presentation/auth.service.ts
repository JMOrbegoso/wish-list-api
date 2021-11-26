import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(userId: string) {
    const payload = { sub: userId };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
