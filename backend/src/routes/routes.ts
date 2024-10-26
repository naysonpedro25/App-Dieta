import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { UserRegisterController } from "../controllers/UserRegisterController";
import { UserLoginController } from "../controllers/UserLoginController";
import { PrincipalController } from "../controllers/PrincipalController";
import { fastifyJwt } from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { UserRepository } from "../infra/repository/UserRepository";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
interface tokenUser{ 
  email: string,
  id: string
}
export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.register(fastifyJwt, { secret: "supersecret" });
  fastify.register(fastifyCookie, { secret: "supersecret" });
  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        
        const decoded = await req.jwtVerify() as tokenUser;
        if (!decoded) {
          res.status(400).send({ message: "Erro ao decodificar o accesstoken" });
          return;
        }

        const user = UserRepository.getUserRepository().findUserById(Number(decoded.id));

        req.user = user;
      } catch (err) {
        console.log("Erro no decorate" + err);
        res.status(400).send({ error: err });
      }
    }
  );

  const userLoginController: UserLoginController = new UserLoginController();
  const userRegisterController = new UserRegisterController(fastify);

  fastify.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true, message: "route " + req.url });
  });

  fastify.post(
    "/register",
    (
      req: FastifyRequest<{
        Body: {
          name: string;
          email: string;
          password: string;
          age: number;
          sex: string;
          weight: number;
          height: number;
          objective: string;
          calories_goals: number;
          calories_consumed: number;
          calories_burned: number;
        };
      }>,
      reply: FastifyReply
    ) => {
      userRegisterController.handler(req, reply);
    }
  );

  fastify.post(
    "/login",
    (
      request: FastifyRequest<{ Body: { email: string; password: string } }>,
      reply
    ) => {
      userLoginController.handler(request, reply, fastify);
    }
  );

  fastify.post(
    "/refresh-token",
    (
      request: FastifyRequest<{
        Body: { refreshToken: string };
      }>,
      reply: FastifyReply
    ) => {
      userRegisterController.refreshLhTokeHandler(request, reply);
    }
  );

  fastify.get(
    "/principal",
    { onRequest: [fastify.authenticate] },
    (request: FastifyRequest, reply: FastifyReply) => {
      new PrincipalController().handle(request, reply);
    }
  );
}
