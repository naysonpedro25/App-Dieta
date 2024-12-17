import {PrismaClient} from "@prisma/client";
import {getPrismaInstance} from "../PrismaInstance";


export class DailyCaloriesRepository {
    private db: PrismaClient = getPrismaInstance();
    static dailyCaloriesRepositorySingleton: DailyCaloriesRepository;

    static getUserRepository() {
        if (!this.dailyCaloriesRepositorySingleton) this.dailyCaloriesRepositorySingleton = new DailyCaloriesRepository();
        return this.dailyCaloriesRepositorySingleton;
    }

    async updateCaloriesConsumed(userId: number, calories_consumed:number) {
       return  this.db.dailyCalories.update({
            where: {
                userId: userId
            },
            data: {
                calories_consumed:{
                    increment: calories_consumed,
                }
            }
        })
    }

    async updateCaloriesBurned(userId: number, calories_burned:number) {
       return  this.db.dailyCalories.update({
            where: {
                userId: userId
            },
            data: {
                calories_burned:{
                    increment: calories_burned,
                }
            },

        })
    }

}