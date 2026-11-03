import { PrismaClient } from '@prisma/client';

// Singleton do Prisma Client — uma única instância compartilhada por toda a aplicação.
export const prisma = new PrismaClient();
