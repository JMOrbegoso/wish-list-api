import { Controller, Post, HttpCode, UseGuards, Request } from '@nestjs/common';
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
  localLogin(@Request() req): OutputUserDto {
    return req.user;
  }
}
