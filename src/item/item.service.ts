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

    async createItem(dto: createItemDto) {
        if (!dto.organizationId) {
            throw new BadRequestException('Warehouse id is required');
        }

        return await this.prisma.item.create({
            data: {
                name: dto.name,
                organizationId: dto.organizationId,
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

    async updateItem(id: string, dto: updateItemDto) {
        if (!id) {
            throw new BadRequestException('Item id is required');
        }

        const item = await this.prisma.item.findUnique({
            where: {
                id,
            },
        });

        if (!item) {
            throw new NotFoundException('Item not found');
        }

        return await this.prisma.item.updateMany({
            where: {
                id,
            },
            data: {
                name: dto.name,
            },
        });
    }

    async deleteItem(id: string) {
        if (!id) {
            throw new BadRequestException('Item id is required');
        }

        await this.prisma.item.delete({
            where: {
                id,
            },
        });

        return { message: 'Item deleted' };
    }
}
