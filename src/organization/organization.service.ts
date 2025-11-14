import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import generateInviteCode from 'utils/generate-invite-code';
import { createOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
    constructor(private prisma: PrismaService) {}

    async createOrganization(userId: number, dto: createOrganizationDto) {
        if (!dto.name) {
            throw new BadRequestException('Organization name is required');
        }

        const inviteCode = generateInviteCode();

        console.log(inviteCode);
        const organization = await this.prisma.organization.create({
            data: {
                name: dto.name,
                inviteCode,
            },
        });

        await this.prisma.organizationUser.create({
            data: {
                userId,
                organizationId: organization.id,
                role: UserRole.OWNER,
            },
        });

        return organization;
    }

    async getMyOrganizations(userId: number) {
        return await this.prisma.organizationUser.findMany({
            where: {
                userId
            },
            include: {
                organization: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }) 
    }

    async getOrganizationById(id: string) {
        if (!id) {
            throw new BadRequestException('Organization id is required');
        }

        const organization = await this.prisma.organization.findUnique({
            where: {
                id,
            },
        });

        if (!organization) {
            throw new NotFoundException('Organization not found');
        }

        return organization;
    }

    async updateOrganization(id: string, dto: UpdateOrganizationDto) {
        if (!id) {
            throw new BadRequestException('Organization id is required');
        }

        return await this.prisma.organization.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
            },
        });
    }

    async joinOrganization(userId: number, inviteCode: string) {
        if (!inviteCode) {
            throw new BadRequestException('Invite code is required');
        }

        const organization = await this.prisma.organization.findUnique({
            where: {
                inviteCode
            },
        })

        if(!organization) {
            throw new NotFoundException("Organization not found")
        }

        return await this.prisma.organizationUser.create({
            data: {
                userId,
                organizationId: organization.id
            },
            include: {
                organization: true
            }
        })
    }

    async removeUserFromOrganization(organizationId: string, userId: number) {
        const user = await this.prisma.organizationUser.findUnique({
            where: {
                userId_organizationId: { userId, organizationId },
            },
        });

        if (!user) {
            throw new NotFoundException(
                'User is not a member of this organization',
            );
        }

        await this.prisma.organizationUser.delete({
            where: {
                userId_organizationId: { userId, organizationId },
            },
        });

        return { message: 'User removed from organization' };
    }
}
