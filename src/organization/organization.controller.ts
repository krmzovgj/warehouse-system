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

    @Get(':organizationId')
    @UseGuards(AuthGuard)
    getOrganizationById(@Param('organizationId') organizationId: string) {
        return this.organizationService.getOrganizationById(organizationId);
    }

    @Get(':organizationId/warehouse')
    @UseGuards(AuthGuard)
    getWarehouseByOrganization(@Param('organizationId') organizationId: string) {
        return this.warehouseService.getWarehouseByOrganization(organizationId);
    }

    @Put(':organizationId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    updateOrganization(
        @Param('organizationId') organizationId: string,
        @Body() dto: UpdateOrganizationDto,
    ) {
        return this.organizationService.updateOrganization(organizationId, dto);
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

    @Delete(':organizationId/user/:userId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    removeUserFromOrganization(
        @Param('organizationId') organizationId: string,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.organizationService.removeUserFromOrganization(
            organizationId,
            userId,
        );
    }
}
