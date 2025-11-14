import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStockDto {
    @IsNotEmpty()
    quantity: number;

    @IsString()
    unit: string;

    @IsNotEmpty()
    price: Prisma.Decimal | number | string;

    @IsString()
    @IsNotEmpty()
    warehouseId: string;
}
