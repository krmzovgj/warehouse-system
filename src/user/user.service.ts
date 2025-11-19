import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        const hashed = await bcrypt.hash(
            password,
            Number(process.env.SALT_OR_ROUNDS!) || 12,
        );

        return await this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashed,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: false,
            },
        });
    }

    async findUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: false,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        if (!id) {
            throw new BadRequestException('User id is required');
        }

        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: false,
            },
        });
    }

    async deleteUser(id: number) {
        const user = await this.prisma.user.delete({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        return { message: 'User deleted' };
    }
}
