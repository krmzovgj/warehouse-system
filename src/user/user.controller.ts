import {
    Controller,
    Get,
    Put,
    Req,
    UseGuards,
    Param,
    Body,
    ParseIntPipe,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

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
