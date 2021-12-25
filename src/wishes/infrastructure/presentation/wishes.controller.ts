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
  ChangeWishPrivacyLevelCommand,
  CompleteWishCommand,
  CreateWishCommand,
  CreateWishStageCommand,
  DeleteWishCommand,
  DeleteWishStageCommand,
  UncompleteWishCommand,
  UndeleteWishCommand,
  UpdateWishCommand,
  UpdateWishStageCommand,
} from '../../application/commands';
import { OutputWishDto } from '../../application/dtos';
import {
  GetPublicWishesQuery,
  GetWishByIdQuery,
  GetWishesByWisherIdQuery,
  GetWishesQuery,
} from '../../application/queries';
import {
  ChangeWishPrivacyLevelDto,
  CompleteWishDto,
  CreateWishDto,
  CreateWishStageDto,
  UpdateWishDto,
  UpdateWishStageDto,
  WishIdDto,
  WishStageIdDto,
  WisherIdDto,
} from '../dto';
import {
  WishOwnershipGuard,
  WishOwnershipKey,
  WishStageOwnershipGuard,
  WishStageOwnershipKey,
} from './guards';

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
      target: 'body',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, WishOwnershipGuard)
  @Patch()
  async update(@Body() dto: UpdateWishDto): Promise<void> {
    const command = new UpdateWishCommand(
      dto.id,
      dto.title,
      dto.description,
      dto.urls,
      dto.imageUrls,
      dto.categories,
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

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Patch('complete/:id/:completionDate')
  async completeWish(@Param() params: CompleteWishDto): Promise<void> {
    const command = new CompleteWishCommand(
      params.id,
      parseInt(params.completionDate),
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Patch('uncomplete/:id')
  async uncompleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new UncompleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Patch('change-privacy-level/:id/:privacyLevel')
  async changeWishPrivacyLevel(
    @Param() params: ChangeWishPrivacyLevelDto,
  ): Promise<void> {
    const command = new ChangeWishPrivacyLevelCommand(
      params.id,
      params.privacyLevel,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishStageOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Own },
      { role: Role.moderator(), ownership: Ownership.Own },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'wishStageId',
    },
  })
  @UseGuards(AuthGuard('jwt'), WishStageOwnershipGuard)
  @Post('stage')
  async createWishStage(@Body() dto: CreateWishStageDto): Promise<void> {
    const command = new CreateWishStageCommand(
      dto.wishStageId,
      dto.id,
      dto.title,
      dto.description,
      dto.urls,
      dto.imageUrls,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishStageOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Any },
      { role: Role.moderator(), ownership: Ownership.Any },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'wishStageId',
    },
  })
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, WishStageOwnershipGuard)
  @Patch('stage')
  async updateWishStage(@Body() dto: UpdateWishStageDto): Promise<void> {
    const command = new UpdateWishStageCommand(
      dto.wishStageId,
      dto.title,
      dto.description,
      dto.urls,
      dto.imageUrls,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RoleOwnership>(WishStageOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), WishStageOwnershipGuard)
  @Delete('stage/:wishStageId')
  async deleteWishStage(@Param() params: WishStageIdDto): Promise<void> {
    const command = new DeleteWishStageCommand(params.wishStageId);
    await this.commandBus.execute(command);
  }
}
