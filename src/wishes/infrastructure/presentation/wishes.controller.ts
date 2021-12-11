import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

@ApiTags('WishesController')
@Controller('wishes')
export class WishesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: [OutputWishDto], description: 'Wishes found.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @Get()
  async getAllWishes(): Promise<OutputWishDto[]> {
    const query = new GetWishesQuery();
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: [OutputWishDto], description: 'Wishes found.' })
  @Get('/public')
  async getPublicWishes(): Promise<OutputWishDto[]> {
    const query = new GetPublicWishesQuery();
    return await this.queryBus.execute(query);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [OutputWishDto], description: 'Wishes found.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @Get('wisherId/:wisherId')
  async getWishesByWisherId(
    @Param() params: WisherIdDto,
  ): Promise<OutputWishDto[]> {
    const query = new GetWishesByWisherIdQuery(params.wisherId);
    return await this.queryBus.execute(query);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: OutputWishDto, description: 'Wish found.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get(':id')
  async getWishById(@Param() params: WishIdDto): Promise<OutputWishDto> {
    const query = new GetWishByIdQuery(params.id);
    return await this.queryBus.execute(query);
  }

  @ApiBearerAuth()
  @ApiBody({ required: true, type: CreateWishDto })
  @ApiCreatedResponse({ description: 'Wish created successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
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

  @ApiBearerAuth()
  @ApiBody({ required: true, type: UpdateWishDto })
  @ApiCreatedResponse({ description: 'Wish updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
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

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wish deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Delete(':id')
  async deleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new DeleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wish undeleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('undelete/:id')
  async undeleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new UndeleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wish completed successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('complete/:id/:completionDate')
  async completeWish(@Param() params: CompleteWishDto): Promise<void> {
    const command = new CompleteWishCommand(
      params.id,
      parseInt(params.completionDate),
    );
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wish uncompleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Patch('uncomplete/:id')
  async uncompleteWish(@Param() params: WishIdDto): Promise<void> {
    const command = new UncompleteWishCommand(params.id);
    await this.commandBus.execute(command);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Wish privacy level changed successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
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

  @ApiBearerAuth()
  @ApiBody({ required: true, type: CreateWishStageDto })
  @ApiCreatedResponse({ description: 'Wish stage created successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
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

  @ApiBearerAuth()
  @ApiBody({ required: true, type: UpdateWishStageDto })
  @ApiCreatedResponse({ description: 'Wish stage updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
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

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wish stage deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  @ApiForbiddenResponse({
    description: 'This resource is prohibited for the authenticated user.',
  })
  @ApiNotFoundResponse({ description: 'Wish stage not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Delete('stage/:wishStageId')
  async deleteWishStage(@Param() params: WishStageIdDto): Promise<void> {
    const command = new DeleteWishStageCommand(params.wishStageId);
    await this.commandBus.execute(command);
  }
}
