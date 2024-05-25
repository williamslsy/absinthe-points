import { PrismaClient } from '@prisma/client';

let prisma;

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  // In production always create a new Prisma Client
  prisma = new PrismaClient();
} else {
  // In development or other environments, reuse the instance
  // Check if it already exists on the global object (in Node.js)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
