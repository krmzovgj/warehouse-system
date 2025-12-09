    import {
        Injectable,
        Logger,
        OnModuleDestroy,
        OnModuleInit,
    } from '@nestjs/common';
    import { PrismaPg } from '@prisma/adapter-pg'; // NEW: PostgreSQL adapter
import { PrismaClient } from '@prisma/client';
    import 'dotenv/config';
    import { Pool } from 'pg'; // NEW: Native JS PostgreSQL driver

    @Injectable()
    export class PrismaService
        extends PrismaClient
        implements OnModuleInit, OnModuleDestroy
    {
        private readonly logger = new Logger(PrismaService.name);

        constructor() {
            // NEW: Create a connection pool using the env var
            const connectionString = process.env.DATABASE_URL;
            if (!connectionString) {
                throw new Error('DATABASE_URL is required');
            }
            const pool = new Pool({ connectionString });

            const adapter = new PrismaPg(pool);

            super({
                adapter, 
                log: ['query', 'info', 'warn', 'error'],
            });
            
        }

        async onModuleInit() {
            await this.$connect();
            this.logger.log('Prisma connected');
        }

        async onModuleDestroy() {
            await this.$disconnect();
        }
    }