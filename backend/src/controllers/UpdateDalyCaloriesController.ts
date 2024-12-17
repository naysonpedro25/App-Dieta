import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {DailyCaloriesService} from "../infra/services/DailyCaloriesService";

export default class UpdateUserController {
    private service: DailyCaloriesService = new DailyCaloriesService();
    async handler(req: FastifyRequest<{ Body: {
            userId:number;
            calories_consumed: number;
            calories_burned: number;
        }}>, res: FastifyReply, fastity: FastifyInstance) {
        try {
            const {calories_consumed, calories_burned, userId} = req.body;
            if(calories_burned == 0 && calories_consumed > 0){
                const calories = await this.service.updateCaloriesConsumed(userId,calories_consumed);
                return res.status(201).send({message: "calories consumed updated successfully.", calories_consumed: calories});
            }else if(calories_consumed == 0 && calories_burned > 0){
                const calories = await this.service.updateCaloriesBurned(userId,calories_burned);
                return  res.status(201).send({message: "calories burned updated successfully.", calories_burned: calories});
            }else if(calories_consumed > 0 && calories_burned > 0){
                return res.status(400).send({message : "não é possível atualizar os valores simultaneamente"})
            }else {
                return res.status(400).send({message : "Valores são nulos"})
            }
        } catch (error) {
            console.log("User login error : ", error);
            res.status(401).send({message: 'Error ao fazer login: ', error});
        }
    }
}