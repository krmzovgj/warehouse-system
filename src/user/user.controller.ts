import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() req: Request) {
        const userId = req.user.id;

        return this.userService.findUserById(userId);
    }

    @Put(':userId')
    @UseGuards(AuthGuard)
    updateUser(
        @Body() dto: UpdateUserDto,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.userService.updateUser(userId, dto);
    }

    @Delete('me')
    @UseGuards(AuthGuard)
    deleteUser(@Req() req: Request) {
        const userId = req.user.id;

        return this.userService.deleteUser(userId);
    }
}
