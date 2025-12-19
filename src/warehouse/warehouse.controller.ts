import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseService } from './warehouse.service';
import { OrganizationGuard } from 'src/organization/organization.guard';
import type { Request } from 'express';

@Controller('warehouse')
export class WarehouseController {
    constructor(private warehouseService: WarehouseService) {}

    @Post()
    @UseGuards(AuthGuard, OrganizationGuard)
    createWarehouse(@Body() dto: CreateWarehouseDto, @Req() req: Request) {
        const membership = req['organizationMembership'];

        return this.warehouseService.createWarehouse(
            dto,
            membership.organizationId,
        );
    }

    @Get(':warehouseId')
    @UseGuards(AuthGuard)
    getWarehouseById(@Param('warehouseId') warehouseId: string) {
        return this.warehouseService.getWarehouseById(warehouseId);
    }

    @Put(':warehouseId')
    @UseGuards(AuthGuard, OrganizationGuard)
    updateWarehouse(
        @Param('warehouseId') warehouseId: string,
        @Body() dto: UpdateWarehouseDto,
        @Req() req: Request,
    ) {
        const membership = req['organizationMembership'];

        return this.warehouseService.updateWarehouse(
            warehouseId,
            membership.organizationId,
            dto,
        );
    }

    @Delete(':warehouseId')
    @UseGuards(AuthGuard, OrganizationGuard, RolesGuard)
    @Roles(Role.OWNER)
    deleteWarehouse(
        @Param('warehouseId') warehouseId: string,
        @Req() req: Request,
    ) {
        const membership = req['organizationMembership'];

        return this.warehouseService.deleteWarehouse(
            warehouseId,
            membership.organizationId,
        );
    }
}
