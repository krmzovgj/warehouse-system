import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

@Module({
    imports: [PrismaModule],
    providers: [WarehouseService],
    controllers: [WarehouseController],
    exports: [WarehouseService]
})
export class WarehouseModule {}
