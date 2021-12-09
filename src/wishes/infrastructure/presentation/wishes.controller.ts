import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWishCommand } from '../../application/commands';
import { OutputWishDto } from '../../application/dtos';
import { GetWishByIdQuery, GetWishesQuery } from '../../application/queries';
import { CreateWishDto, WishIdDto } from './dto';

@ApiTags('WishesController')
@Controller('wishes')
export class WishesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOkResponse({ type: [OutputWishDto], description: 'Wishes found.' })
  @Get()
  async getAllWishes(): Promise<OutputWishDto[]> {
    const query = new GetWishesQuery();
    return await this.queryBus.execute(query);
  }

  @ApiOkResponse({ type: OutputWishDto, description: 'Wish found.' })
  @ApiNotFoundResponse({ description: 'Wish not found.' })
  @ApiBadRequestResponse({ description: 'Something went wrong.' })
  @Get(':id')
  async getWishById(@Param() params: WishIdDto): Promise<OutputWishDto> {
    const query = new GetWishByIdQuery(params.id);
    return await this.queryBus.execute(query);
  }

  @ApiBody({ required: true, type: CreateWishDto })
  @ApiCreatedResponse({ description: 'Wish created successfully.' })
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
}
