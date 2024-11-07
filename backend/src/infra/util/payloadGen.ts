import UserDTO from "../DTOs/UserDTO";
export type PayloadGen=  {
    sub: string;
    iat: number;
    exp: number;
    scope: string;
}


export function payloadGen(user : PayloadGen | UserDTO, timerSec: number ): PayloadGen{


    return {
        sub: (user as UserDTO).email?? (user as PayloadGen).sub ,         // ID do usuário (subject)
        iat: Math.floor(Date.now() / 1000), // m formato Unix tempo atual em segundos
        exp: Math.floor(Date.now() / 1000) + timerSec,
        scope: "signature impersonation"
    }
}