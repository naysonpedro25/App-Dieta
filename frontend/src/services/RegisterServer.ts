import axios from './axios.ts'
import {AuthContext} from "../context/auth.tsx";

export  type BodyModel = {
    name: string;
    email: string;
    age: number;
    sex: string;
    password: string;
    weight: number;
    height: number;
    objective: string;
    calories_goals: number;

}

export const registerUser = async (auth :AuthContext, body : BodyModel ) =>{
    try {
        const res = await axios.post('/register', body);
        const user = res.data.user;
        auth?.login(user);
        console.log("Register feito com sucesso ", user);
    }catch (err){
        console.log("Error no login : " + err);
        throw err;
    }
}

