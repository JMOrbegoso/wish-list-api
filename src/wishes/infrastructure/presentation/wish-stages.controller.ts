import {
  Body,
  Controller,
  Delete,
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
import {
  CreateWishStageCommand,
  DeleteWishStageCommand,
  UpdateWishStageCommand,
} from '../../application/commands';
import { CreateWishStageDto, UpdateWishStageDto, WishStageIdDto } from '../dto';
import {
  WishOwnershipGuard,
  WishOwnershipKey,
  WishStageOwnershipGuard,
  WishStageOwnershipKey,
} from './guards';

@Controller('wish-stages')
export class WishStagesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @SetMetadata<string, RoleOwnership>(WishOwnershipKey, {
    ownerships: [
      { role: Role.admin(), ownership: Ownership.Own },
      { role: Role.moderator(), ownership: Ownership.Own },
      { role: Role.basic(), ownership: Ownership.Own },
    ],
    idProperty: {
      target: 'body',
      name: 'wishId',
    },
  })
  @UseGuards(AuthGuard('jwt'), WishOwnershipGuard)
  @Post()
  async createWishStage(@Body() dto: CreateWishStageDto): Promise<void> {
    const command = new CreateWishStageCommand(
      dto.id,
      dto.wishId,
      dto.title,
      dto.description,
      dto.urls,
      dto.imageUrls,
    );
    await this.commandBus.execute(command);
  }

  @SetMetadata<string, RequestIds>(RequestIdsKey, {
    bodyIdPropertyName: 'id',
    paramsIdPropertyName: 'id',
  })
  @SetMetadata<string, RoleOwnership>(WishStageOwnershipKey, {
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
  @UseGuards(AuthGuard('jwt'), SameIdRequestGuard, WishStageOwnershipGuard)
  @Patch(':id')
  async updateWishStage(
    @Param() params: WishStageIdDto,
    @Body() dto: UpdateWishStageDto,
  ): Promise<void> {
    const command = new UpdateWishStageCommand(
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
      target: 'params',
      name: 'id',
    },
  })
  @UseGuards(AuthGuard('jwt'), WishStageOwnershipGuard)
  @Delete(':id')
  async deleteWishStage(@Param() params: WishStageIdDto): Promise<void> {
    const command = new DeleteWishStageCommand(params.id);
    await this.commandBus.execute(command);
  }
}
