import { FastifyReply, FastifyRequest } from "fastify";
import {UserRepository} from '../infra/repository/UserRepository'
import {User} from "@prisma/client"

export class PrincipalController {
    async handle(request: FastifyRequest, reply: FastifyReply ) {
        try {
            const users = await new UserRepository().getAllUsers();
            const user = request.user as User;
            const formattedUsers = users.map(user => {
                return { ...user, id: user.id.toString() };
            });
            return reply.send(formattedUsers);
        }catch (error) {
            reply.status(401).send({ error: 'Unauthorized' });
        }
    }

}