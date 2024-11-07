import UserDTO from "../DTOs/UserDTO";
import { User } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  repo: UserRepository;

  constructor() {
    this.repo = UserRepository.getUserRepository();
  }

  async create(user: UserDTO): Promise<User | null | undefined> {
    try {
      return (await this.repo.createUser(user));
    } catch (err) {
      console.log(err);
    }
  }


  async findUserByEmail(email: string): Promise<User | null | undefined> {
    try {
      return (await this.repo.findUserByEmail(email));
    } catch (err) {
      console.log(err);
    }
  }
}
