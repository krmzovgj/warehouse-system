import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStockDto {
    @IsNotEmpty()
    quantity: number;

    @IsString()
    unit: string;

    @IsNotEmpty()
    price: Prisma.Decimal | number | string;

    @IsString()
    @IsNotEmpty()
    itemId: string;

    @IsString()
    @IsNotEmpty()
    warehouseId: string;
}
