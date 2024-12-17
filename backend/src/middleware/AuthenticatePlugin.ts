import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../infra/services/UserService";
import {PayloadGen} from "../infra/util/payloadGen";
import UserDTO from "../infra/DTOs/UserDTO";
import {User} from "@prisma/client";
const authenticatePlugin = async function (
  req: FastifyRequest,
  res: FastifyReply,
  fastify: FastifyInstance
) {
  const service = new UserService();
  const token = req.cookies.accessToken; // pega o access token
  if (!token) {
    return res.status(401).send({ message: "Token not found" , status: false, token });
  }
  try {
    // const decoded = await req.jwtVerify() as tokenUser;
    const decoded:PayloadGen = fastify.jwt.verify(token); // verifica o token. Se n for válido lança um error e cai no catch
    if (!decoded) {
      return res.status(401).send({ message: "Erro ao decodificar o accesstoken : Authorization n foi enviada", status:false });
    }

    const resDb = (await service.findUserByEmail(decoded.sub));
    const user  = resDb?.userDto;
    if(!user){
      return res.status(401).send({ message: "Usuário não encontrado com esse email", status: false });
    }

    req.user = user;



  } catch (err) {
    console.log("Erro no decorate" + err);
    return res.status(401).send({ error: err, status:false, message : "accessTonke expirou" });
  }
};
export default authenticatePlugin;