import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OutputUserDto } from '../../../users/application/dtos';
import { LoginDto } from '../dtos';

@ApiTags('AuthController')
@Controller()
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User login successfully.',
    type: OutputUserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({
    description:
      'User is deleted, blocked, not verified or the password is incorrect.',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    const payload = { username: req.user.username, sub: req.user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
