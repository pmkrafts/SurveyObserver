import { prisma } from "@/config/prisma";
import { CreateUserInput, User } from "@/types/user.types";

class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { id: "asc" } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({ data: { name: input.name, email: input.email } });
  }

  async deleteAll(): Promise<void> {
    await prisma.user.deleteMany();
  }
}

export const userRepository = new UserRepository();
