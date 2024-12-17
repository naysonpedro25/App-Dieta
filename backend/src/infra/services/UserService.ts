import UserDTO from "../DTOs/UserDTO";
import {DailyCalories, User} from "@prisma/client";
import {UserRepository} from "../repository/UserRepository";
import {DailyCaloriesDTO} from "../DTOs/DailyCaloriesDTO";
import { hash, genSalt, compare } from "bcrypt"


export class UserService {
    repo: UserRepository;

    constructor() {
        this.repo = UserRepository.getUserRepository();
    }

    async create(user: UserDTO, hashPassword: string): Promise<UserDTO | undefined> {
        try {

            const userdb = await this.repo.createUser({password: hashPassword, ...user} as User);

            const dto = {
                ...userdb,
                dailyCalories: userdb?.dailyCalories,
            };
            const {createdAt, updatedAt, password, ...userReturn} = dto;
            return userReturn as UserDTO;
        } catch (err) {
            console.log("Create user service : ", err);
        }

    }


    async findUserByEmail(email: string): Promise<{userDto: UserDTO | undefined, passwordHashed?: string} | undefined> {
        try {
            const userdb = (await this.repo.findUserByEmail(email));

            const dto = {
                ...userdb,
                dailyCalories: userdb?.dailyCalories,
            };
            const {createdAt, updatedAt, password, ...userReturn} = dto;

            return {userDto: userReturn as UserDTO, passwordHashed: password};
        } catch (err) {
            console.log(err);
        }
    }
}
