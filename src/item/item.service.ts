import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) {}

    async createItem(dto: createItemDto, organizationId: string) {
        if (!organizationId) {
            throw new BadRequestException('Warehouse id is required');
        }

        return await this.prisma.item.create({
            data: {
                name: dto.name,
                organizationId,
            },
        });
    }

    async getItemsInOrganization(organizationId: string) {
        if (!organizationId) {
            throw new BadRequestException('Organization id is required');
        }

        return await this.prisma.item.findMany({
            where: {
                organizationId,
            },
        });
    }

    async updateItem(id: string, organizationId: string, dto: updateItemDto) {
        if (!id) {
            throw new BadRequestException('Item id is required');
        }

        const item = await this.prisma.item.updateMany({
            where: {
                id,
                organizationId,
            },
            data: {
                name: dto.name,
            },
        });

        if (item.count === 0) {
            throw new NotFoundException('Item not found');
        }

        return { message: 'Item updated' };
    }

    async deleteItem(id: string, organizationId: string) {
        if (!id) {
            throw new BadRequestException('Item id is required');
        }

        const item = await this.prisma.item.deleteMany({
            where: {
                id,
                organizationId,
            },
        });

        if (item.count === 0) {
            throw new NotFoundException('Item not found');
        }

        return { message: 'Item deleted' };
    }
}
