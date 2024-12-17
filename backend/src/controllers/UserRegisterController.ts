import {FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import {$Enums} from "@prisma/client";
import {genSalt, hash} from "bcrypt";
import {UserService} from "../infra/services/UserService";
import {payloadGen} from "../infra/util/payloadGen";
import UserDTO from "../infra/DTOs/UserDTO";
import userDTO from "../infra/DTOs/UserDTO";

export class UserRegisterController {


    async handler(req: FastifyRequest<{
        Body: {
            name: string;
            email: string;
            age: number;
            sex: string;
            password: string;
            weight: number;
            height: number;
            objective: string;
            calories_goals: number;

        }
    }>, res: FastifyReply, fastify: FastifyInstance) {
        try {
            const userData = req.body;

            if (!userData || !userData.email || !userData.password || !userData.sex|| !userData.objective || !userData.height|| !userData.weight
                || !userData.age || !userData.calories_goals
            ) {
                console.log("Dados inválidos email ou senha");
                return res.status(400).send({message: "Dados inválidos email ou senha"});
            }

            const service = new UserService();
            const existingUser = await service.findUserByEmail(userData.email);

            if (!existingUser) {
                console.error("Email já registrado no banco");
                return res.status(400).send({message: "E-mail em uso"});
            }


            const salt = await genSalt(10);
            userData.password = await hash(userData.password, salt);
            const {password, ...userDtoF} = userData;

            if(userData.sex === $Enums.Sex.MALE) userData.sex = $Enums.Sex.MALE;
            else userData.sex = $Enums.Sex.MALE;

            switch (userData.sex){
                case $Enums.Objective.MAINTAIN: userData.objective = $Enums.Objective.MAINTAIN;
                break;
                case $Enums.Objective.WEIGHT_GAIN: userData.objective = $Enums.Objective.WEIGHT_GAIN;
                break;
                case $Enums.Objective.WEIGHT_LOSS: userData.objective = $Enums.Objective.WEIGHT_LOSS;
            }

            const newUser = await service.create(userDtoF as UserDTO, password);

            const accessToken = fastify.jwt.sign(payloadGen(newUser, 7 * 24 * 60 * 60)?? {}, {expiresIn: '7d'});
            return res.setCookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                sameSite: "strict",
                secure: true

            }).status(201).send({message: "Register successfully", user: newUser});
        } catch (error) {
            res.status(500).send({message: "Falha ao criar user: " + error});
            console.error(error);
        }
    }


}

interface TokenPayload {
    email: string;
}
