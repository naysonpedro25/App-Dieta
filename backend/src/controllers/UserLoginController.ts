import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../infra/repository/UserRepository"
import { hash, genSalt, compare } from "bcrypt"
export class UserLoginController {
    userRepo: UserRepository = new UserRepository();

    async handler(req: FastifyRequest<{
        Body: { email: string, password: string }
    }>, res: FastifyReply, fastify: FastifyInstance) {

        try {
            const { email, password } = req.body;
            const user = await this.userRepo.findUserByEmail(email);

            if (!user) return res.status(400).send({ message: 'Invalid email or password' });

            const salt = await genSalt(10);
            const hashPassword = await hash(password, salt);

            if (!(await compare(password, hashPassword))) {return res.status(401).send({ message: 'Invalid password' })};

            const accessToken = fastify.jwt.sign({ userId: user.id.toString(), email: user.email }, { expiresIn: '1h' });
            const refreshToken = fastify.jwt.sign({ userId: user.id.toString(), email: user.email }, { expiresIn: '7d' });

            return res.status(201).send({ message: "Login successfully", accessToken, refreshToken });

        } catch (error){
            console.log("User login error : " , error);
            res.status(401).send({ message: 'Error: ', error });

        }
    }

} 