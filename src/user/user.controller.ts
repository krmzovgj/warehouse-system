import { Controller, Get, Put, Req, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() req: Request) {
        const userId = req.user.id

        return this.userService.findUserById(userId)
    }  
    
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Req() req: Request, @Param('id') id: string) {
        const userId = parseInt(id)
        const { firstName, lastName, email } = req.body

        return this.userService.updateUser(userId, firstName, lastName, email)
    }
}
