import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    // @IsString()
    // unit: string;

    // @IsNumber()
    // quantity: number;

    // price: Prisma.Decimal | number | string;

    @IsString()
    @IsNotEmpty()
    organizationId: string;
}
