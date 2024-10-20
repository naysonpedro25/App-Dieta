import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserRepository } from "../repository/UserRepository";
import { User } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

export class UserRegisterController {
  fastify: FastifyInstance;
  userRepo: UserRepository;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
    this.userRepo = new UserRepository();
  }

  async handler(
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
    res: FastifyReply
  ) {
    try {
      const userData: User = req.body as User;
      const existingUser = await this.userRepo.findUserByEmail(userData.email);

      if (existingUser) {
        return res.status(400).send({ message: "User ja existe" });
      }

      const salt = await genSalt(10);
      userData.password = await hash(userData.password, salt);
      await this.userRepo.createUser(userData);

      const accessToken = this.fastify.jwt.sign(
        { email: userData.email },
        { expiresIn: "1h" }
      );
      const refreshToken = this.fastify.jwt.sign(
        { email: userData.email },
        { expiresIn: "7d" }
      );

      return res
        .setCookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60,
        })
        .send({ message: "Register successfully", accessToken });
    } catch (error) {
      res.status(500).send({ message: "Falha ao criar user: " + error });
      console.error(error);
    }
  }

  async refresLhTokeHandler(
    req: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { refreshToken } = req.body;
      const decoded = this.fastify.jwt.verify(refreshToken) as TokenPayload;
      if (!decoded) {
        console.log("Refresh preta n");
        return reply.status(401).send({ message: "Ivalid refresh token" });
      }
      const accessToken = this.fastify.jwt.sign(
        { email: decoded.email },
        { expiresIn: "1h" }
      );
      reply.send({ accessToken });
    } catch (err) {
      console.error(err);
      return reply
        .status(500)
        .send({ message: "Falha ao renovar o token: " + err });
    }
  }
}

interface TokenPayload {
  email: string;
}
