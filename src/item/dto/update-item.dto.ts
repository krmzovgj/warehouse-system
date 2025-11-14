import { IsNotEmpty, IsString } from 'class-validator';

export class updateItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
