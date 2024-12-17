import {Sex, Objective, User} from "@prisma/client";
import {DailyCaloriesDTO} from "./DailyCaloriesDTO";

 type UserDTO = Omit<User, | "createdAt" | "updatedAt" | "password">
export  interface UserDTOObsol {
    id?: number;
    name: string;
    email: string;
    age: number;
    sex: Sex;
    weight: number;
    height: number;
    objective:Objective;
    calories_goals: number;
    dailyCalories: DailyCaloriesDTO | null;
}

export default UserDTO;