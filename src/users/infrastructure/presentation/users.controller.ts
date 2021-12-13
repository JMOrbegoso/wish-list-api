import { extname } from 'path';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import {
  Ownership,
  RequestIds,
  RequestIdsKey,
  RoleOwnership,
} from '../../../shared/infrastructure/presentation/decorators';
import { SameIdRequestGuard } from '../../../shared/infrastructure/presentation/guards';
import {
  BlockUserCommand,
  CreateUserCommand,
  DeleteUserCommand,
  UnblockUserCommand,
  UndeleteUserCommand,
  UpdateUserPasswordCommand,
  UpdateUserProfileCommand,
  UpdateUserProfilePictureCommand,
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
import { RoleOwnershipGuard, RoleOwnershipKey } from './guards';

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
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RequestIds>(RequestIdsKey, {
    bodyIdPropertyName: 'id',
    paramsIdPropertyName: 'id',
  })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, RoleOwnershipGuard)
  @Patch('profile/:id')
  async updateProfile(
    @Param() params: UserIdDto,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<void> {
    const command: UpdateUserProfileCommand =
      updateUserProfileDtoToUpdateUserProfileCommand(dto);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'User profile picture, in jpg format and 1 Mb max size.',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiPayloadTooLargeResponse({ description: 'File too large.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Own },
      { role: Role.moderator(), ownership: Ownership.Own },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Patch('profile-picture/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1050000 },
      fileFilter: (req, file, callback) => {
        // Check if the file have the extension jpg or jpeg
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
          return callback(
            new BadRequestException('Only jpg image files are allowed.'),
            false,
          );

        callback(null, true);
      },
      storage: diskStorage({
        destination: './public/users/profile-pictures',
        filename: (req, file, callback) => {
          callback(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateProfilePicture(
    @Param() params: UserIdDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const imgUrl = `${req.protocol}://${req.headers.host}/users/profile-pictures/${file.filename}`;
    const command = new UpdateUserProfilePictureCommand(params.id, imgUrl);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User profile picture successfully deleted.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Delete('profile-picture/:id')
  async deleteProfilePicture(@Param() params: UserIdDto): Promise<void> {
    const command = new UpdateUserProfilePictureCommand(params.id, null);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiBody({ required: true, type: UpdateUserPasswordDto })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RequestIds>(RequestIdsKey, {
    bodyIdPropertyName: 'id',
    paramsIdPropertyName: 'id',
  })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Own },
      { role: Role.moderator(), ownership: Ownership.Own },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, RoleOwnershipGuard)
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
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Patch('block/:id')
  async blockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new BlockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User unblocked successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Patch('unblock/:id')
  async unblockUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UnblockUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Delete(':id')
  async deleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new DeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User undeleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
    ],
    idProperty: {
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Patch('undelete/:id')
  async undeleteUser(@Param() params: UserIdDto): Promise<void> {
    const command = new UndeleteUserCommand(params.id);
    await this.commandBus.execute(command);
  }
}
