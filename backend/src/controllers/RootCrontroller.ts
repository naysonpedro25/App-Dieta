import {FastifyReply, FastifyRequest} from "fastify";


export class RootCrontroller {


    async handler(req: FastifyRequest, res: FastifyReply) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(400).send({message: "user é null", status: false});
                console.log("User não está logado")
            }
            return res.status(200).send({user, status: true});

        } catch (e) {

        }
    }
}