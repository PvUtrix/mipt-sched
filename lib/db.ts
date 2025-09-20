import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a function to safely initialize Prisma client
function createPrismaClient(): PrismaClient | null {
  try {
    return new PrismaClient()
  } catch (error) {
    console.warn('Failed to initialize Prisma client:', error)
    return null
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma
}
