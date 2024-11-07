import  {ReactNode} from "react";
import {useAuth} from "../context/auth.tsx";
import {Navigate} from "react-router-dom";

export  default  function ProtectedRoute({children} : {children: ReactNode}) {
    const auth = useAuth();

    // if(!auth?.isLoggedIn()){
    //     return <Navigate to={'/home'} replace/>
    // }
    return (<>{children}</>);
}