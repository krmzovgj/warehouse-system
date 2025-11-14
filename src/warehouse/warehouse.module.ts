import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
    imports: [PrismaModule],
    providers: [WarehouseService],
    controllers: [WarehouseController],
    exports: [WarehouseService]
})
export class WarehouseModule {}
