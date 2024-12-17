import fastify, {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from "fastify";
import {UserRegisterController} from "../controllers/UserRegisterController";
import {UserLoginController} from "../controllers/UserLoginController";
import {PrincipalController} from "../controllers/PrincipalController";
import {fastifyJwt} from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import UserDTO from "../infra/DTOs/UserDTO";
import authenticatePlugin from '../middleware/AuthenticatePlugin'
// import {AccessTokenController} from "../controllers/RefreshTokenController";
import {config} from 'dotenv';
import {RootCrontroller} from '../controllers/RootCrontroller'
import UpdateUserController from "../controllers/UpdateDalyCaloriesController";
import {DailyCaloriesService} from "../infra/services/DailyCaloriesService";
import * as diagnostics_channel from "node:diagnostics_channel";

config({
    path: '.env'
});

const SECRET_KEY = process.env.JWT_SECRET ?? "supersecret";
const COOKIES_KEY = process.env.COOKIES_KEY ?? "supersecret";


declare module "fastify" {
    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }
}


interface tokenUser {
    email: string
}

export async function routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) {

    fastify.register(fastifyJwt, {secret: SECRET_KEY});
    fastify.register(fastifyCookie, {secret: COOKIES_KEY});

    fastify.decorate( // segurança das rotas privadas
        "authenticate",
        async (req: FastifyRequest, res: FastifyReply) => {
            await authenticatePlugin(req, res, fastify);
        }
    );

    const userLoginController: UserLoginController = new UserLoginController();
    const userRegisterController = new UserRegisterController();
    const rootCrontroller = new RootCrontroller();
    const updateDailyCalories = new UpdateUserController();

    fastify.post(
        "/register",
        (
            req: FastifyRequest<{
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
                    calories_consumed: number;
                    calories_burned: number;
                }
            }>,
            reply: FastifyReply
        ) => {
            userRegisterController.handler(req, reply, fastify);
        }
    );

    fastify.post(
        "/login",
        async (
            request: FastifyRequest<{ Body: { email: string; password: string } }>,
            reply
        ) => {
            await userLoginController.handler(request, reply, fastify);
        }
    );
    //
    // fastify.post("/refresh-token", async (req: FastifyRequest<{ // para verificar ou
    //         Body: { refreshToken: string }
    //     }>, reply: FastifyReply) => {
    //         await new AccessTokenController().handler(req, reply, fastify);
    //     }
    // );
    //

    fastify.register(async (instance) => {
        instance.addHook('onRequest', fastify.authenticate);
        instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
            (await rootCrontroller.handler(req, res));
        })
        instance.get("/home", async (request: FastifyRequest, reply: FastifyReply) => {
            (await new PrincipalController().handler(request, reply));
        });

        instance.post("/users/:id", async (req: FastifyRequest<{
            Body: { calories_burned?: number, calories_consumed?: number }
            ,Params: {
                id: string
            }
        }>, res: FastifyReply) => {
            const {id} = req.params;
            const idNum = Number(id);
            const {calories_burned, calories_consumed} = req.body;

            if (!calories_consumed) {
                if (!calories_burned) {
                    return res.status(400).send({message: 'Invalid calories'});
                }

                const result = await new DailyCaloriesService().updateCaloriesBurned(idNum, calories_burned);
                return res.status(200).send({message: "update calories_burned sucesso ", calories_burned});
            }
            const result=  await new DailyCaloriesService().updateCaloriesConsumed(idNum, calories_consumed);
            return res.status(200).send({message: "update calories_consumed sucesso ", calories_consumed});

        })

    });


}
