import {PrismaClient, Food} from "@prisma/client";
import {getPrismaInstance} from "../PrismaInstance";

export class FoodRepository {
    private static foodRepository: FoodRepository;
    private db: PrismaClient = getPrismaInstance();

    async createFoodOnDb(food: Food): Promise<Food | undefined> {
        return !food? undefined :this.db.food.create({data: food});
    }

}
