import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { createItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Post()
    @UseGuards(AuthGuard)
    createItem(@Body() dto: createItemDto) {
        return this.itemService.createItem(dto);
    }

    @Get()
    @UseGuards(AuthGuard)
    getItemsInOrganization(@Query('organizationId') organizationId: string) {
        return this.itemService.getItemsInOrganization(organizationId);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateItem(@Param('id') id: string, @Body() dto: updateItemDto) {
        return this.itemService.updateItem(id, dto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteItem(@Param('id') id: string) {
        return this.itemService.deleteItem(id);
    }
}
