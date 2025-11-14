import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
    constructor(private stockService: StockService) {}

    @Post()
    @UseGuards(AuthGuard)
    createStock(@Body() dto: CreateStockDto) {
        return this.stockService.createStock(dto);
    }

    @Get()
    @UseGuards(AuthGuard)
    getStocks(@Query('itemId') itemId: string, @Query('warehouseId') warehouseId: string) {
        return this.stockService.getStocks(itemId, warehouseId)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
        return this.stockService.updateStock(id, dto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteStock(@Param('id') id: string) {
        return this.stockService.deleteStock(id) 
    }
}
