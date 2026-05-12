import { PrismaClient } from "@prisma/client";
import { loadEnv } from "@/config/loadEnv";

loadEnv();

export const prisma = new PrismaClient();
