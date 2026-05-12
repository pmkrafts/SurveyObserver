import { CreateUserInput, User } from "@/types/user.types";

const initialUsers: User[] = [
  { id: "1", name: "Ava Stone", email: "ava@example.com" },
  { id: "2", name: "Noah Reed", email: "noah@example.com" }
];

class UserRepository {
  private users: User[] = [...initialUsers];
  private nextId = initialUsers.length + 1;

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(input: CreateUserInput): User {
    const user: User = {
      id: String(this.nextId++),
      name: input.name,
      email: input.email
    };

    this.users.push(user);
    return user;
  }

  reset(): void {
    this.users = [...initialUsers];
    this.nextId = initialUsers.length + 1;
  }
}

export const userRepository = new UserRepository();
