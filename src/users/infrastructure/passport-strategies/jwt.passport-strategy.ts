import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OutputUserDto } from '../../application/dtos';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload): Promise<OutputUserDto> {
    const outputUserDto = new OutputUserDto();
    outputUserDto.id = payload.sub;
    outputUserDto.email = payload.email;
    outputUserDto.username = payload.username;
    outputUserDto.isVerified = payload.isVerified;
    outputUserDto.isBlocked = payload.isBlocked;
    outputUserDto.firstName = payload.firstName;
    outputUserDto.lastName = payload.lastName;
    outputUserDto.birthday = payload.birthday;
    outputUserDto.createdAt = payload.createdAt;
    outputUserDto.updatedAt = payload.updatedAt;
    outputUserDto.biography = payload.biography;
    outputUserDto.roles = payload.roles;
    outputUserDto.profilePicture = payload.profilePicture;
    outputUserDto.deletedAt = payload.deletedAt;

    return { ...outputUserDto };
  }
}
