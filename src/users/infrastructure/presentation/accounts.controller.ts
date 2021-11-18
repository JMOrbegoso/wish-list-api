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
import { CreateUserDto, UserIdDto, UpdateUserDto } from '../dtos';
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

  @ApiOkResponse({ type: [OutputUserDto] })
  @Get()
  async getAllUsers(): Promise<OutputUserDto[]> {
    const query = new GetUsersQuery();
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(':id')
  async getUserById(@Param() params: UserIdDto): Promise<OutputUserDto> {
    const query = new GetUserByIdQuery(params.id);
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<OutputUserDto> {
    const query = new GetUserByEmailQuery(email);
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('username/:username')
  async getUserByUserName(
    @Param('username') username: string,
  ): Promise<OutputUserDto> {
    const query = new GetUserByUserNameQuery(username);
    return await this.queryBus.execute(query);
  }

  @ApiBody({ required: true, type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse()
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const command: CreateUserCommand = Mapper.toCreateUserCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBody({ required: true, type: UpdateUserDto })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
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

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch('block/:id')
  async blockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new BlockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch('unblock/:id')
  async unblockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UnblockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Delete(':id')
  async deleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new DeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch('undelete/:id')
  async undeleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UndeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }
}
