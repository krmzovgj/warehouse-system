import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { WarehouseService } from './warehouse.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

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
        return this.warehouseService.updateWarehouse(id, dto)
    }
}
