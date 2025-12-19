import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const organizationId = String(request.headers['organizationid']);

        if (!organizationId) return false;

        const organizationUser = await this.prisma.organizationUser.findUnique({
            where: {
                userId_organizationId: {
                    userId: user.id,
                    organizationId,
                },
            },
        });

        if (!organizationUser) return false;

        return requiredRoles.includes(organizationUser.role);
    }
}
