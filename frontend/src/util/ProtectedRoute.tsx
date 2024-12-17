import  {ReactNode} from "react";
import {useAuth} from "../context/auth.tsx";
import {Navigate} from "react-router-dom";

export  default  function ProtectedRoute({children} : {children: ReactNode}) {
    const auth = useAuth();

    return !auth?.user ? <Navigate to={'/login'} replace/> :children;
}