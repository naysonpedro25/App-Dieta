import React, {createContext, useContext, useEffect, useState} from "react";
import axios, {AxiosInstance} from 'axios'
import {useNavigate} from "react-router-dom";

interface AuthContext {
    accessToken?: any,
    user?: any,
    login: (token: any, user: any) => void,
    logout: () => void,
    axios: AxiosInstance,
    isLoggedIn: () => void,
}

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({children}: { children?: React.ReactNode }) {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

    const login = (token: any, user: any) => {

        setAccessToken(token);
        setUser(user);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.getItem("user") , " " , localStorage.getItem("accessToken"));
    };
    const isLoggedIn = () => {
        return !!accessToken && !!user;
    };
    //
    // useEffect(() => {
    //     if (accessToken ) {
    //
    //         localStorage.setItem("accessToken", accessToken);
    //         localStorage.setItem("user", JSON.stringify(user));
    //     } else {
    //         localStorage.removeItem("accessToken");
    //         localStorage.removeItem("user");
    //         console.log("removendo do lcal ", accessToken, user)
    //     }
    //
    // }, [accessToken])
    useEffect(() => {
        console.log(localStorage.getItem("user") , " " , localStorage.getItem("accessToken"));
    }, []);


    const logout = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/login');
    };

    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/",
        withCredentials: true,
        timeout:10000
    })

    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:3000/refresh-token", {withCredentials: true});
            console.log(res.data)
            const newAccessToken = await res.data.accessToken;
            console.log('token renovado')
            return newAccessToken;
        } catch (error) {
            console.log("Erro ao renovar token", error);
            logout();
        }
    }

    axiosInstance.interceptors.request.use((config) => {
        if (accessToken && config.url != '/login' && config.url != '/register' && config.url != '/refresh-token') {
            config.headers["Authorization"] = `Bearer ${accessToken}`;

        }
        return config;
    }, (error) => Promise.reject(error));

    // axiosInstance.interceptors.response.use((response) => {
    //     return response
    // }, async (error) => {
    //     console.log("Intercepcaocarai")
    //     const originalRequest = error.config;
    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //         const newToken = await refreshToken();
    //         console.log("pegando novo token "  + newToken)
    //         if (newToken) {
    //             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
    //             console.log("token renovado")
    //             return axiosInstance(originalRequest);
    //         }
    //     }
    //             console.log("refresh token já era")
    //     return Promise.reject({...error, refreshTokenExpired: true});
    // })



    axiosInstance.interceptors.response.use(async (response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;
            try {
                const token = await refreshToken();
                if (token) {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    console.log("velho :" + accessToken, " novo :" + token )
                    setAccessToken(token);
                    localStorage.setItem("accessToken", token);
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.log("Erro ao validar token", err);
            }

        }
        return Promise.reject(error);
    });
    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                login,
                logout,
                isLoggedIn,
                axios: axiosInstance
            }}>{children}</AuthContext.Provider>
    )


}
export const useAuth = () => useContext(AuthContext);

