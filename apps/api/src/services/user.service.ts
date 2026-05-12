import { userRepository } from "@/repositories/user.repository";
import { AppError } from "@/utils/appError";
import { CreateUserInput, User } from "@/types/user.types";

export class UserService {
  getUsers(): User[] {
    return userRepository.findAll();
  }

  getUserById(id: string): User {
    const user = userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  createUser(input: CreateUserInput): User {
    return userRepository.create(input);
  }
}

export const userService = new UserService();
