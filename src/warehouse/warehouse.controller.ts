import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
    constructor(private warehouseService: WarehouseService) {}

    @Post()
    @UseGuards(AuthGuard)
    createWarehouse(@Body() dto: CreateWarehouseDto) {
        return this.warehouseService.createWarehouse(dto);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getWarehouseById(@Param('id') id: string) {
        return this.warehouseService.getWarehouseById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateWarehouse(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
        return this.warehouseService.updateWarehouse(id, dto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    deleteWarehouse(@Param('id') id: string) {
        return this.warehouseService.deleteWarehouse(id);
    }
}
