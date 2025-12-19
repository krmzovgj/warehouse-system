import { IsNotEmpty, IsString } from 'class-validator';

export class createItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
