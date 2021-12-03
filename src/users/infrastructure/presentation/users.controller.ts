import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BlockUserCommand,
  CreateUserCommand,
  DeleteUserCommand,
  UnblockUserCommand,
  UndeleteUserCommand,
  UpdateUserPasswordCommand,
  UpdateUserProfileCommand,
} from '../../application/commands';
import { OutputUserDto } from '../../application/dtos';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  GetUserByUsernameQuery,
  GetUsersQuery,
} from '../../application/queries';
import { Role } from '../../domain/value-objects';
import {
  CreateUserDto,
  UpdateUserPasswordDto,
  UpdateUserProfileDto,
  UserEmailDto,
  UserIdDto,
  UsernameDto,
} from '../dtos';
import {
  createUserDtoToCreateUserCommand,
  updateUserPasswordDtoToUpdateUserPasswordCommand,
  updateUserProfileDtoToUpdateUserProfileCommand,
} from '../mappings';
import { ParamAndBodySameIdGuard, RolesGuard } from './guards';

@ApiTags('UsersController')
@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOkResponse({ type: [OutputUserDto], description: 'Users found.' })
  @Get()
  async getAllUsers(): Promise<OutputUserDto[]> {
    const query = new GetUsersQuery();
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto, description: 'User found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get(':id')
  async getUserById(@Param() params: UserIdDto): Promise<OutputUserDto> {
    const query = new GetUserByIdQuery(params.id);
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto, description: 'User found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get('email/:email')
  async getUserByEmail(@Param() params: UserEmailDto): Promise<OutputUserDto> {
    const query = new GetUserByEmailQuery(params.email);
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto, description: 'User found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get('username/:username')
  async getUserByUsername(
    @Param() params: UsernameDto,
  ): Promise<OutputUserDto> {
    const query = new GetUserByUsernameQuery(params.username);
    return await this.queryBus.execute(query);
  }

  @ApiBody({ required: true, type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const command: CreateUserCommand = createUserDtoToCreateUserCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiBody({ required: true, type: UpdateUserProfileDto })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new ParamAndBodySameIdGuard())
  @Patch(':id')
  async update(
    @Param() params: UserIdDto,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<void> {
    const command: UpdateUserProfileCommand =
      updateUserProfileDtoToUpdateUserProfileCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiBody({ required: true, type: UpdateUserPasswordDto })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new ParamAndBodySameIdGuard())
  @Patch('update-password/:id')
  async updatePassword(
    @Param() params: UserIdDto,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<void> {
    const command: UpdateUserPasswordCommand =
      updateUserPasswordDtoToUpdateUserPasswordCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User blocked successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new RolesGuard([Role.admin(), Role.moderator()]))
  @Patch('block/:id')
  async blockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new BlockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User unblocked successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new RolesGuard([Role.admin(), Role.moderator()]))
  @Patch('unblock/:id')
  async unblockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UnblockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new RolesGuard([Role.admin(), Role.moderator()]))
  @Delete(':id')
  async deleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new DeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User undeleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @UseGuards(AuthGuard('jwt'), new RolesGuard([Role.admin(), Role.moderator()]))
  @Patch('undelete/:id')
  async undeleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UndeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }
}
