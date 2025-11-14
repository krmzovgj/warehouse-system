import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { createOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationService } from './organization.service';
import type { Request } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('organization')
export class OrganizationController {
    constructor(
        private organizationService: OrganizationService,
        private warehouseService: WarehouseService,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    createOrganization(
        @Req() req: Request,
        @Body() dto: createOrganizationDto,
    ) {
        const userId = req.user.id;

        return this.organizationService.createOrganization(userId, dto);
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    getMyOrganizations(@Req() req: Request) {
        const userId = req.user.id;
        
        return this.organizationService.getMyOrganizations(userId);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrganizationById(@Param('id') id: string) {
        return this.organizationService.getOrganizationById(id);
    }

    @Get(':id/warehouse')
    @UseGuards(AuthGuard)
    getWarehouseByOrganization(@Param('id') id: string) {
        return this.warehouseService.getWarehouseByOrganization(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    updateOrganization(
        @Param('id') id: string,
        @Body() dto: UpdateOrganizationDto,
    ) {
        return this.organizationService.updateOrganization(id, dto);
    }

    @Delete(':id/user/:userId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    removeUserFromOrganization(
        @Param('id') organizationId: string,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.organizationService.removeUserFromOrganization(
            organizationId,
            userId,
        );
    }

    @Post('join/:inviteCode')
    @UseGuards(AuthGuard)
    joinOrganization(
        @Param('inviteCode') inviteCode: string,
        @Req() req: Request,
    ) {
        const userId = req.user.id;

        return this.organizationService.joinOrganization(userId, inviteCode);
    }
}
