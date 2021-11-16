import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
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
import { CreateUserDto, UpdateUserDto, OutputUserDto } from '../dtos';
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

  @ApiBody({ required: true, type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse()
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const command: CreateUserCommand = Mapper.toCreateUserCommand(dto);
    return await this.commandBus.execute(command);
  }

  @ApiOkResponse({ type: [OutputUserDto] })
  @Get()
  async getAllUsers(): Promise<OutputUserDto[]> {
    const query = new GetUsersQuery();
    const users = await this.queryBus.execute(query);
    return users.map((user) => Mapper.toOutputUserDto(user));
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<OutputUserDto> {
    const query = new GetUserByIdQuery(id);
    const user = await this.queryBus.execute(query);
    if (!user) throw new NotFoundException();
    return Mapper.toOutputUserDto(user);
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<OutputUserDto> {
    const query = new GetUserByEmailQuery(email);
    const user = await this.queryBus.execute(query);
    if (!user) throw new NotFoundException();
    return Mapper.toOutputUserDto(user);
  }

  @ApiOkResponse({ type: OutputUserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get('username/:username')
  async getUserByUserName(
    @Param('username') username: string,
  ): Promise<OutputUserDto> {
    const query = new GetUserByUserNameQuery(username);
    const user = await this.queryBus.execute(query);
    if (!user) throw new NotFoundException();
    return Mapper.toOutputUserDto(user);
  }

  @ApiBody({ required: true, type: UpdateUserDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    if (id !== dto.id) throw new BadRequestException('Id are different');

    const command: UpdateUserCommand = Mapper.toUpdateUserCommand(dto);
    return await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch('block/:id')
  async blockUser(@Param('id') id: string): Promise<void> {
    const command = new BlockUserCommand(id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch('unblock/:id')
  async unblockUser(@Param('id') id: string): Promise<void> {
    const command = new UnblockUserCommand(id);
    await this.commandBus.execute(command);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Date> {
    const command = new DeleteUserCommand(id);
    const deletedDate = await this.commandBus.execute(command);

    if (!deletedDate) throw new NotFoundException();

    return deletedDate;
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch('undelete/:id')
  async undeleteUser(@Param('id') id: string): Promise<void> {
    const command = new UndeleteUserCommand(id);
    await this.commandBus.execute(command);
  }
}
