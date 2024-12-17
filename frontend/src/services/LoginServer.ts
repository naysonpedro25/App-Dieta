import axios from './axios.ts'
import {AuthContext} from "../context/auth.tsx";


export const loginUser = async (auth :AuthContext, body : {email : string ,password : string} ) =>{
    try {
        const res = await axios.post('/login', body);
        const user = res.data.user;
        auth?.login(user);
        console.log("Login sucesso ", user);

    }catch (err){
        console.log("Error no login : " + err);
        throw err;
    }
}

