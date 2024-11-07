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
import {AccessTokenController} from "../controllers/RefreshTokenController";
import {config} from 'dotenv';
config({
    path: '.env'
});

const SECRET_KEY = process.env.JWT_SECRET?? "supersecret";
const COOKIES_KEY = process.env.COOKIES_KEY?? "supersecret";



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
            authenticatePlugin(req, res, fastify);
        }
    );

    const userLoginController: UserLoginController = new UserLoginController();
    const userRegisterController = new UserRegisterController(fastify);

    fastify.get("/", (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({ok: true, message: "route " + req.url});
    });

    fastify.post(
        "/register",
        (
            req: FastifyRequest<{
                Body: UserDTO;
            }>,
            reply: FastifyReply
        ) => {
            userRegisterController.handler(req, reply);
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

    fastify.get("/refresh-token", async (req: FastifyRequest<{ // para verificar ou
            Body: { refreshToken: string }
        }>, reply: FastifyReply) => {
            await new AccessTokenController().handler(req, reply, fastify);
        }
    );

    // fastify.get('/access-token', async (req: FastifyRequest, reply: FastifyReply) => {

    // })


    fastify.register(async (insance) => {
        insance.addHook('onRequest', insance.authenticate);
        insance.get("/principal", async (request: FastifyRequest, reply: FastifyReply) => {
            (await new PrincipalController().handler(request, reply));
        });

        insance.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
            reply.send("sexo");
        })
    });


}
