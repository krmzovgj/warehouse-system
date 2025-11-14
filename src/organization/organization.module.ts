import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WarehouseModule } from 'src/warehouse/warehouse.module';

@Module({
  imports: [PrismaModule, WarehouseModule],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
