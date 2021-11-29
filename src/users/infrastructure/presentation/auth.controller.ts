import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import {
  GenerateAuthTokensCommand,
  RefreshAccessTokenCommand,
  VerifyUserCommand,
} from '../../application/commands';
import { AuthTokensDto } from '../../application/dtos';
import { LoginDto, RefreshTokenDto } from '../dtos';

@ApiTags('AuthController')
@Controller()
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User login successfully.',
    type: AuthTokensDto,
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({
    description:
      'User is deleted, blocked, not verified or the password is incorrect.',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() req,
    @RealIP() ipAddress: string,
  ): Promise<AuthTokensDto> {
    const command = new GenerateAuthTokensCommand(req.user, ipAddress);
    return await this.commandBus.execute(command);
  }

  @ApiBody({ required: true, type: RefreshTokenDto })
  @ApiOkResponse({
    description: 'Auth tokens successfully refreshed.',
    type: AuthTokensDto,
  })
  @ApiUnauthorizedResponse({ description: 'Refresh token is invalid.' })
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body() dto: RefreshTokenDto,
    @RealIP() ipAddress: string,
  ): Promise<AuthTokensDto> {
    const command = new RefreshAccessTokenCommand(dto.refresh_token, ipAddress);
    return await this.commandBus.execute(command);
  }

  @ApiOkResponse({ description: 'User verified successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get('verify')
  async verify(@Query('code') code: string): Promise<void> {
    const command = new VerifyUserCommand(code);
    await this.commandBus.execute(command);
  }
}
