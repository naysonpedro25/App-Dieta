import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient = new PrismaClient();
export function getPrismaInstance(): PrismaClient {
    if (!prisma) prisma = new PrismaClient();
    return prisma;
}