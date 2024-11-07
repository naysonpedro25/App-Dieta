import {FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import {User} from "@prisma/client";
import {genSalt, hash} from "bcrypt";
import IUser from "../infra/DTOs/UserDTO";

import {UserService} from "../infra/services/UserService";

export class UserRegisterController {
    fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    async handler(req: FastifyRequest<{ Body: IUser }>, res: FastifyReply) {
        try {
            const userData: User = req.body as User;
            const service = new UserService();
            const existingUser = await service.findUserByEmail(userData.email);

            if (existingUser != null){
                console.error("Email já registrado no banco" );
                return res.status(400).send({message: "E-mail em uso"});
            }



            const salt = await genSalt(10);
            userData.password = await hash(userData.password, salt);

            await service.create(userData);

            const accessToken = this.fastify.jwt.sign(
                { email: userData.email},
                {expiresIn: "1h"}
            );

            const refreshToken = this.fastify.jwt.sign(
                { email: userData.email},
                {expiresIn: "7d"}
            );

            return res
                .setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60,
                }).send({message: "Register successfully", accessToken});
        } catch (error) {
            res.status(500).send({message: "Falha ao criar user: " + error});
            console.error(error);
        }
    }

    // async refreshLhTokeHandler(
    //     req: FastifyRequest<{ Body: { refreshToken: string } }>,
    //     reply: FastifyReply
    // ) {
    //     try {    
    //         const {refreshToken} = req.body;
    //         const decoded = this.fastify.jwt.verify(refreshToken) as TokenPayload;
    //         if (!decoded) {
    //             console.log("Refresh preta n");
    //             return reply.status(401).send({message: "Ivalid refresh token"});
    //         }
    //         const accessToken = this.fastify.jwt.sign(
    //             {email: decoded.email},
    //             {expiresIn: "1h"}
    //         );
    //         reply.send({accessToken});
    //     } catch (err) {
    //         console.error(err);
    //         return reply
    //             .status(500)
    //             .send({message: "Falha ao renovar o token: " + err});
    //     }
    // }
}

interface TokenPayload {
    email: string;
}
