import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
    constructor(private prisma: PrismaService) {}

    async createWarehouse(dto: CreateWarehouseDto, organizationId: string) {
        if (!organizationId) {
            throw new BadRequestException('Organization id is required');
        }

        return await this.prisma.warehouse.create({
            data: {
                organizationId,
                name: dto.name,
            },
        });
    }

    async getWarehouseById(id: string) {
        if (!id) {
            throw new BadRequestException('Warehouse id is required');
        }

        const warehouse = await this.prisma.warehouse.findUnique({
            where: {
                id,
            },
        });

        if (!warehouse) {
            throw new NotFoundException('Warehouse not found');
        }

        return warehouse;
    }

    async getWarehouseByOrganization(organizationId: string) {
        if (!organizationId) {
            throw new BadRequestException('Organization id is required');
        }

        return await this.prisma.warehouse.findMany({
            where: {
                organizationId,
            },
        });
    }

    async updateWarehouse(
        id: string,
        organizationId: string,
        dto: UpdateWarehouseDto,
    ) {
        if (!id) {
            throw new BadRequestException('Warehouse id must be provided');
        }

        const warehouse = await this.prisma.warehouse.updateMany({
            where: {
                id,
                organizationId,
            },
            data: {
                name: dto.name,
            },
        });

        if (warehouse.count === 0) {
            throw new NotFoundException('Warehouse not found');
        }

        return { message: 'Warehouse updated' };
    }

    async deleteWarehouse(id: string, organizationId: string) {
        if (!id) {
            throw new BadRequestException('Warehouse id is required');
        }

        const warehouse = await this.prisma.warehouse.deleteMany({
            where: {
                id,
                organizationId,
            },
        });

        if (warehouse.count === 0) {
            throw new NotFoundException('Warehouse not found');
        }

        return { message: 'Warehouse deleted' };
    }
}
