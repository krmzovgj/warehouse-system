import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { id } = request.user;

        const organizationIdHeader = request.headers['organizationid'];

        if (!organizationIdHeader) {
            throw new BadRequestException('Organization id is required');
        }

        const organizationId = String(organizationIdHeader);

        const memebership = await this.prisma.organizationUser.findFirst({
            where: {
                userId: id,
                organizationId,
            },
        });

        if (!memebership) {
            throw new UnauthorizedException(
                'You are not part of this organization',
            );
        }

        request['organizationMembership'] = memebership;

        return true;
    }
}
