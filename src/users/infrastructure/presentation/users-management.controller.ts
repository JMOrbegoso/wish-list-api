import {
  Controller,
  Delete,
  Param,
  Patch,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  Ownership,
  RoleOwnership,
} from '../../../shared/infrastructure/presentation/decorators';
import {
  BlockUserCommand,
  DeleteUserCommand,
  UnblockUserCommand,
  UndeleteUserCommand,
} from '../../application/commands';
import { Role } from '../../domain/value-objects';
import { UserIdDto } from '../dtos';
import { RoleOwnershipGuard, RoleOwnershipKey } from './guards';

@Controller('users')
export class UsersManagementController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

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
