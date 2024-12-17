import {DailyCalories, PrismaClient, User} from "@prisma/client"
import {getPrismaInstance} from "../PrismaInstance";

import {DailyCaloriesDTO} from "../DTOs/DailyCaloriesDTO";
type Test = {
    dailyCalories: DailyCalories;
    user:User;
}
export class UserRepository {

    private db: PrismaClient = getPrismaInstance();
    static userRepositorySingleton: UserRepository;

    static getUserRepository() {
        if (!this.userRepositorySingleton) this.userRepositorySingleton = new UserRepository();
        return this.userRepositorySingleton;
    }



    async createUser(user: User): Promise<User & {dailyCalories: DailyCalories | null} | null> {
        return  (await this.db.user.create({
            data: {
                ...user,
                dailyCalories:{
                    create:{
                        date: new Date(),
                        calories_consumed: 0,
                        calories_burned:0
                    }
                }
            },
            include: {
                dailyCalories: true,
            }
        }));

    }

    async findUserByEmail(email: string): Promise<User & {dailyCalories: DailyCalories | null} | null> {
        const u= (await this.db.user.findUnique({
            where: {email: email},
            include:{
                dailyCalories: true
            }
        }));
        return u;
    }




}