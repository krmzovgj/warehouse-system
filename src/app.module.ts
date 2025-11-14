import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { OrganizationModule } from './organization/organization.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, OrganizationModule, WarehouseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
