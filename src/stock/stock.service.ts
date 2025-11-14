import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) {}

    async createStock(dto: CreateStockDto) {
        return await this.prisma.stock.create({
            data: {
                quantity: dto.quantity,
                price: dto.price,
                unit: dto.unit,
                itemId: dto.itemId,
                warehouseId: dto.warehouseId,
            },
            include: {
                item: {
                    select: {
                        name: true,
                    },
                },
                warehouse: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getStocks(itemId?: string, warehouseId?: string) {
        const where: any = {};

        if (itemId) {
            where.itemId = itemId;
        }

        if (warehouseId) {
            where.warehouseId = warehouseId;
        }

        return await this.prisma.stock.findMany({
            where,
            include: {
                item: {
                    select: {
                        name: true,
                    },
                },
                warehouse: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async updateStock(id: string, dto: UpdateStockDto) {
        if (!id) {
            throw new BadRequestException('Stock id is required');
        }

        const stock = await this.prisma.stock.findUnique({
            where: {
                id,
            },
        });

        if (!stock) {
            throw new NotFoundException('Stock not found');
        }

        return await this.prisma.stock.update({
            where: {
                id,
            },
            data: {
                quantity: dto.quantity,
                price: dto.price,
                unit: dto.unit,
                warehouseId: dto.warehouseId,
            },
        });
    }

    async deleteStock(id: string) {
        if (!id) {
            throw new BadRequestException('Stock id is required');
        }

        await this.prisma.stock.delete({
            where: {
                id,
            },
        });

        return { message: 'Stock deleted' };
    }
}
