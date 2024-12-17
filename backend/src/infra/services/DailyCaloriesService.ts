import {DailyCaloriesRepository} from "../repository/DailyCaloriesRepository";


export class DailyCaloriesService {
    private repo: DailyCaloriesRepository;

    constructor() {
        this.repo = DailyCaloriesRepository.getUserRepository();
    }

    async updateCaloriesConsumed(userId:number, calories_consumed: number ){
        try {
           const dailyCalCons = await this.repo.updateCaloriesConsumed(userId, calories_consumed);
           return dailyCalCons.calories_consumed;
        }catch (err){
            console.log(err);
        }
    }
    async updateCaloriesBurned(userId:number, calories_burned: number ){
        try {
           const dailyCalCons = await this.repo.updateCaloriesBurned(userId, calories_burned);
           return dailyCalCons.calories_burned;
        }catch (err){
            console.log(err);
        }
    }


}