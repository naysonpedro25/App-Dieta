import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {UserService} from "../infra/services/UserService"
import { hash, genSalt, compare } from "bcrypt"
import {payloadGen} from '../infra/util/payloadGen'
import UserDTO from "../infra/DTOs/UserDTO";
export class UserLoginController {
    userService: UserService = new UserService();

    async handler(req: FastifyRequest<{
        Body: { email: string, password: string }
    }>, res: FastifyReply, fastify: FastifyInstance) {

        try {

            const { email, password } = req.body;
            const user = await this.userService.findUserByEmail(email);


            if (!user) return res.status(400).send({ message: 'Invalid email or password' });

            const salt = await genSalt(10);
            const hashPassword = await hash(password, salt);


            if (!(await compare(password, user.password))) {return res.status(401).send({ message: 'Invalid password' })};

            const userDto = user as UserDTO;
            const accessToken = fastify.jwt.sign( payloadGen(userDto,(60 * 2)), { expiresIn: '2m' });
            const refreshToken = fastify.jwt.sign(payloadGen(userDto, 7 *24 * 60 * 60 ), { expiresIn: '7d' });
            return res
                .setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60,
                }).status(201).send({ message: "Login successfully", accessToken,user : userDto });

        } catch (error) {
            console.log("User login error : " , error);
            res.status(401).send({ message: 'Error ao fazer login: ', error });
        }
    }




    }