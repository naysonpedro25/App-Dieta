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
            const userService = (await this.userService.findUserByEmail(email));
            if (!userService || !userService.userDto || !userService.passwordHashed) {
                return res.status(400).send({ message: 'Invalid email or password' });
            }

            const {userDto, passwordHashed} = userService;


            // const hashPassword = await hash(password, salt);


            if (!(await compare(password, passwordHashed))) {return res.status(401).send({ message: 'Invalid password' })};



            const accessToken = fastify.jwt.sign(payloadGen(userDto, 7*24*60*60)?? {}, { expiresIn: '7d' });
            return res.setCookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                sameSite: "strict",
                secure: true

            }).status(201).send({ message: "Login successfully" , user : userDto });

        } catch (error) {
            console.log("User login error : " , error);
            res.status(401).send({ message: 'Error ao fazer login: ', error });
        }
    }




    }