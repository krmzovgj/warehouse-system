import {
    Controller,
    Get,
    Put,
    Req,
    UseGuards,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() req: Request) {
        const userId = req.user.id;

        return this.userService.findUserById(userId);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(
        @Body() dto: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.userService.updateUser(id, dto);
    }
}
