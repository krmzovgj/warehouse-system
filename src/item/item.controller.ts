import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { createItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { OrganizationGuard } from 'src/organization/organization.guard';
import type { Request } from 'express';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Post()
    @UseGuards(AuthGuard, OrganizationGuard)
    createItem(@Body() dto: createItemDto, @Req() req: Request) {
        const membership = req['organizationMembership'];

        return this.itemService.createItem(dto, membership.organizationId);
    }

    @Get()
    @UseGuards(AuthGuard, OrganizationGuard)
    getItemsInOrganization(@Req() req: Request) {
        const membership = req['organizationMembership'];

        return this.itemService.getItemsInOrganization(
            membership.organizationId,
        );
    }

    @Put(':itemId')
    @UseGuards(AuthGuard, OrganizationGuard)
    updateItem(
        @Param('itemId') itemId: string,
        @Body() dto: updateItemDto,
        @Req() req: Request,
    ) {
        const membership = req['organizationMembership'];

        return this.itemService.updateItem(
            itemId,
            membership.organizationId,
            dto,
        );
    }

    @Delete(':itemId')
    @UseGuards(AuthGuard, OrganizationGuard)
    deleteItem(@Param('itemId') itemId: string, @Req() req: Request) {
        const membership = req['organizationMembership']

        return this.itemService.deleteItem(itemId, membership.organizationId);
    }
}
