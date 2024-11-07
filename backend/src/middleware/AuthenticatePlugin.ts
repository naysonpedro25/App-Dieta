import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../infra/services/UserService";
import {PayloadGen} from "../infra/util/payloadGen";
const authenticatePlugin = async function (
  req: FastifyRequest,
  res: FastifyReply,
  fastify: FastifyInstance
) {
  const token = req.headers.authorization?.split(" ")[1]; // pega o access token
  if (!token) {
    return res.status(401).send({ massage: "Token not found" , status: false });
  }
  try {
    // const decoded = await req.jwtVerify() as tokenUser;
    const decoded:PayloadGen = fastify.jwt.verify(token); // verifica o token. Se n for válido lança um error e cai no catch
    if (!decoded) {
      return res.status(401).send({ message: "Erro ao decodificar o accesstoken : Authorization n foi enviada", status:false });
    }
    // const dateNow = Date.now();
    // if (dateNow>= decoded.exp * 1000) {
    //   return res.status(401).send({ message: "expirou ", status:false, decoded, dateNow });
    // }
    const user = new UserService().findUserByEmail(decoded.sub);

    req.user = user;
    res.status(200).send({message: "Token válido", status: true, decoded, now : Math.floor(Date.now()/ 1000)}  );
  } catch (err) {
    console.log("Erro no decorate" + err);
    return res.status(401).send({ error: err, status:false, message : "accessTonke expirou" });
  }
};
export default authenticatePlugin;