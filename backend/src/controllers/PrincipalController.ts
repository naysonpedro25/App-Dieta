import { FastifyReply, FastifyRequest } from "fastify";
import {UserRepository} from '../infra/repository/UserRepository'
import UserDTO from "../infra/DTOs/UserDTO";


export class PrincipalController {
    async handler(request: FastifyRequest, reply: FastifyReply ) {
        try {
            // const users = (await new UserRepository().getAllUsers()).map((user)=>{
            //     const {} = user;
            //     return newUser;
            // });

            // return reply.send(users);
        }catch (error) {
            reply.status(401).send({ error});
        }
    }

}