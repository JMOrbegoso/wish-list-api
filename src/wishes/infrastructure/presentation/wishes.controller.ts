import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  Ownership,
  RequestIds,
  RequestIdsKey,
  RoleOwnership,
} from '../../../shared/infrastructure/presentation/decorators';
import { SameIdRequestGuard } from '../../../shared/infrastructure/presentation/guards';
import { Role } from '../../../users/domain/value-objects';
import { RolesKey } from '../../../users/infrastructure/presentation/decorators';
import {
  RoleOwnershipGuard,
  RoleOwnershipKey,
  RolesGuard,
} from '../../../users/infrastructure/presentation/guards';
import {
  CreateWishCommand,
  DeleteWishCommand,
  UndeleteWishCommand,
  UpdateWishCommand,
} from '../../application/commands';
import { OutputWishDto } from '../../application/dtos';
import {
  GetPublicWishesQuery,
  GetWishByIdQuery,
  GetWishesByWisherIdQuery,
  GetWishesQuery,
} from '../../application/queries';
import { CreateWishDto, UpdateWishDto, WishIdDto, WisherIdDto } from '../dto';
import { WishOwnershipGuard, WishOwnershipKey } from './guards';

@Controller('wishes')
export class WishesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @SetMetadata<string, Role[]>(RolesKey, [Role.admin(), Role.moderator()])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAllWishes(): Promise<OutputWishDto[]> {
    const query = new GetWishesQuery();
    return await this.queryBus.execute(query);
  }

  @Get('/public')
  async getPublicWishes(): Promise<OutputWishDto[]> {
    const query = new GetPublicWishesQuery();
    return await this.queryBus.execute(query);
  }

  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'params',
      name: 'wisherId',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Get('wisherId/:wisherId')
  async getWishesByWisherId(
    @Param() params: WisherIdDto,
  ): Promise<OutputWishDto[]> {
    const query = new GetWishesByWisherIdQuery(params.wisherId);
    return await this.queryBus.execute(query);
  }

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Get(':id')
  async getWishById(@Param() params: WishIdDto): Promise<OutputWishDto> {
    const query = new GetWishByIdQuery(params.id);
    return await this.queryBus.execute(query);
  }

  @SetMetadata<string, RoleOwnership>(RoleOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Own },
      { role: Role.moderator(), ownership: Ownership.Own },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'wisherId',
    },
  })
  @UseGuards(AuthGuard('jwt'), RoleOwnershipGuard)
  @Post()
  async post(@Body() dto: CreateWishDto): Promise<void> {
    const command = new CreateWishCommand(
      dto.id,
      dto.title,
      dto.description,
      dto.privacyLevel,
      dto.wisherId,
      dto.urls,
      dto.imageUrls,
      dto.categories,
      dto.startedAt ? new Date(dto.startedAt).toISOString() : null,
      dto.completedAt ? new Date(dto.completedAt).toISOString() : null,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RequestIds>(RequestIdsKey, {
    bodyIdPropertyName: 'id',
    paramsIdPropertyName: 'id',
  })
  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, WishOwnershipGuard)
  @Patch(':id')
  async update(
    @Param() params: WishIdDto,
    @Body() dto: UpdateWishDto,
  ): Promise<void> {
    const command = new UpdateWishCommand(
      dto.id,
      dto.title,
      dto.description,
      dto.privacyLevel,
      dto.urls,
      dto.imageUrls,
      dto.categories,
      dto.startedAt ? new Date(dto.startedAt).toISOString() : null,
      dto.completedAt ? new Date(dto.completedAt).toISOString() : null,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Delete(':id')
  async deleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new DeleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Patch('undelete/:id')
  async undeleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new UndeleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }
}
