import { FastifyReply, FastifyRequest } from "fastify";
import {UserRepository} from '../repository/UserRepository'

export class PrincipalController {
    async handle(request: FastifyRequest, reply: FastifyReply ) {
        try {
            const users = await new UserRepository().getAllUsers();
            const formattedUsers = users.map(user => {
                return { ...user, id: user.id.toString() };
            });
            return reply.send(formattedUsers);
        }catch (error) {
            reply.status(401).send({ error: 'Unauthorized' });
        }
    }
}