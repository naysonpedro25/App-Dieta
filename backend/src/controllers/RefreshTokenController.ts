import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {PayloadGen, payloadGen} from "../infra/util/payloadGen"

export class AccessTokenController {
    
    async handler(req: FastifyRequest, reply: FastifyReply, fastify :FastifyInstance) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if(!!accessToken) {
            try{
                const decoded = await fastify.jwt.verify(accessToken) as PayloadGen;
                console.log(decoded);
                return reply.status(400).send({ massage: "Access token ainda é válido"});
            }catch (err){
                console.log("Access token expirou, agora vai ser criado um novo :)")
            }
        }

        const refreshToken = req.cookies.refreshToken;
          if (!refreshToken) {
            return reply
              .status(401)
              .send({ message: "refreshtoken not found" });
          }

          try {
            const decoded = fastify.jwt.verify(refreshToken) as PayloadGen;
            if (!decoded.sub) {
              console.log("Email in token not found -> " + decoded);
              return reply
                .status(401)
                .send({ massage: "Email in token not found" });
            }
              const accessToken = fastify.jwt.sign( payloadGen(decoded, (60 * 2)), { expiresIn: '2m' });
            return reply
              .status(200)
              .send({ massage: "token renovado com sucesso", accessToken });
          } catch (err) {
            console.log({ err });
            return reply
              .status(401)
              .send({ message: "Refreshtoken expirou", error: err });
          }
    }
}