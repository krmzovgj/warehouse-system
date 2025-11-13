import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        const hashed = await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS!) || 12);

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

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            },
        })
    }

}
