import { userRepository } from "@/repositories/user.repository";
import { AppError } from "@/utils/appError";
import { CreateUserInput, User } from "@/types/user.types";

export class UserService {
  async getUsers(): Promise<User[]> {
    return userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return userRepository.create(input);
  }
}

export const userService = new UserService();
