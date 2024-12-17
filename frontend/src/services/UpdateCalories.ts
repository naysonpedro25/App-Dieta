import axios from "./axios.ts";
import {AuthContext} from "../context/auth";


export const updateCaloriesBurned = async (
    auth: AuthContext | null, body: { calories_burned: number; }) => {
    try {
        const id: number | undefined = auth?.user?.id;
        const res = await axios.post(`/users/${id}`, body);
        if (!res.data) {
            console.log("data é null")
            return;
        }
       await auth?.reloadUser();
    } catch (err) {
        console.error("Erro em calories berned : " + err);
        throw err;
    }
};
export const updateCaloriesConsumed = async (
    auth: AuthContext | null,
    body: {
        calories_consumed: number;
    }
) => {
    try {
        const id: number | undefined = auth?.user?.id;
        const res = await axios.post(`/users/${id}`, body);
        if (!res.data) {
            console.log("data é null")
            return false;
        }
        if (auth?.reloadUser) {
            await auth?.reloadUser();
        }
    } catch (err) {
        console.error("Erro no consumed : " + err);
        throw err;
    }
};
