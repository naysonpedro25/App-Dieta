import React, {createContext, useContext, useEffect, useState} from "react";
import UserDTO from "../DTOs/UserDTO.ts";
import axiosInstance from "../services/axios.ts";

export interface AuthContext {
    user?: UserDTO | null,
    login: (user: UserDTO) => void,
    logout: () => void,
    reloadUser: () => void,
}

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({children}: { children?: React.ReactNode }) {

    const [user, setUser] = useState<UserDTO | undefined | null>(JSON.parse(localStorage.getItem("user") || 'null'));


    const login = (user: UserDTO) => {
        setUser(user);
    };


    const logout = () => {
        setUser(null);
    };

    const reloadUser = async ()=>{
        try {
            const resp = await axiosInstance.get('/');
            const data = resp.data;
            if (!data) {
                console.log("Data é null")
                return;
            }
            console.log(data)
            if (data.status) {
                const user = data.user;
                login(user);
                console.log("User logado", data, user);
            } else {
                console.log("User não logado");
                logout();
            }
        } catch (err) {
            console.log(err + " Erro em  / back")
            logout();
        }
    }

    useEffect(() => {
        reloadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                reloadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );


}
export const useAuth = () => useContext(AuthContext);

