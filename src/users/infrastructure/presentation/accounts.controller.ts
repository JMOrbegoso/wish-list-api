import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateUserDto,
  UserIdDto,
  UserEmailDto,
  UserNameDto,
  UpdateUserDto,
} from '../dtos';
import { OutputUserDto } from '../../../users/application/dtos';
import { Mapper } from '../mappings';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  GetUserByUserNameQuery,
  GetUsersQuery,
} from '../../application/queries';
import {
  BlockUserCommand,
  CreateUserCommand,
  DeleteUserCommand,
  UnblockUserCommand,
  UndeleteUserCommand,
  UpdateUserCommand,
} from '../../application/commands';

@ApiTags('AccountsController')
@Controller('accounts')
export class AccountsController {
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
  @Get('username/:userName')
  async getUserByUserName(
    @Param() params: UserNameDto,
  ): Promise<OutputUserDto> {
    const query = new GetUserByUserNameQuery(params.userName);
    return await this.queryBus.execute(query);
  }

  @ApiBody({ required: true, type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const command: CreateUserCommand = Mapper.toCreateUserCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBody({ required: true, type: UpdateUserDto })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch(':id')
  async update(
    @Param() params: UserIdDto,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    if (params.id !== dto.id)
      throw new BadRequestException('Id are different.');
    const command: UpdateUserCommand = Mapper.toUpdateUserCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse({ description: 'User blocked successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('block/:id')
  async blockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new BlockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse({ description: 'User unblocked successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('unblock/:id')
  async unblockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UnblockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Delete(':id')
  async deleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new DeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse({ description: 'User undeleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('undelete/:id')
  async undeleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UndeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }
}
