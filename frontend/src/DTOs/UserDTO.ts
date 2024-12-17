import {DailyCaloriesDTO} from "./DailyCaloriesDTO.ts";

export default interface UserDTO {
    id?: number;
    name: string;
    email: string;
    age: number;
    sex: string;
    weight: number;
    height: number;
    objective:string;
    calories_goals: number;
    dailyCalories: DailyCaloriesDTO | null;
}
