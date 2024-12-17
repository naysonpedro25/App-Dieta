import {motion} from "framer-motion";
import Button from "../components/Button.tsx";
import Logo from "../components/assets/logo_app.png"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/auth.tsx";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";

export default function Presentation() {
    const nav = useNavigate();
    const auth = useAuth();
    const [showToast, setShowToast] = useState<boolean>(true);

    return (

        <motion.div
            
            className="main-bg w-full min-h-screen flex justify-center"
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <main className="w-full min-h-svh px-5 flex items-center justify-center flex-col sm:max-w-2xl">
                <div className="max-w-56 mb-4 ">
                    <img
                        src={Logo}
                        alt="Logo-App"
                        className="w-full flex img-flutuation "
                    />
                    <h1 className="text-logo-color w-full text-center font-extrabold text-3xl">
                        PersonalDiet
                    </h1>
                    <p className="w-full text-center mt-2 text-white ">
                        Sua dieta totalmente personalizada
                    </p>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Button
                        onClick={() => {
                            if (!auth?.user) nav("/login");
                            else {
                                if (showToast) {
                                    toast("Você já está logado! redirecionando...", {
                                        position: "top-center",
                                        autoClose: 1000,
                                        progressStyle: {
                                            backgroundColor: "#74bc1e",
                                            color: "#74bc1e"
                                        },
                                        onClose: () => nav('/home'),
                                    });
                                    setShowToast(false);
                                }
                            }
                        }}
                    >

                        Faça Login
                    </Button>
                    <Button onClick={() => {
                        if (!auth?.user) nav("/register");
                        else {
                            if (showToast) {
                                toast("Redirecionando", {
                                    position: "top-center",
                                    autoClose: 1000,
                                    progressStyle:{
                                      backgroundColor: "#74bc1e",
                                        color: "#74bc1e"
                                    },
                                    onClose: () => nav('/home'),
                                });
                                setShowToast(false);
                            }
                        }

                    }}>
                        Registre-se
                    </Button>
                </div>
            </main>
            <ToastContainer/>
        </motion.div>

    )
}
