import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";
import {useAuth} from "../context/auth.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input.tsx'
import { useState} from "react";


const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
})

type FormData = yup.InferType<typeof schema>;
export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const navigate = useNavigate();
    const handlerLogin = async ({email, password}: FormData) => {
        setLoading(true);
        const loadingToastId = toast.loading("Logging in...", { position: "top-center", autoClose: false, hideProgressBar: true }); // chamado no onsubmit do forms

        try {
            if (!auth) {
                console.log("Auth context not exist")
                return;
            }
            const res = await auth?.axios.post("/login", {
                email,
                password,
            });
            const accessToken = res.data.accessToken;
            const user =  res.data.user;
            if (!accessToken || !user) {
                console.log("User not found k")
                return;
            }

            auth?.login(accessToken, user);
            navigate('/home')
            console.log(res.data.message);

            toast.update(loadingToastId, {
                render: "Erro no login",
                type:"error",
                isLoading: false,
                autoClose: 2000,
                closeOnClick: true,
            })
            console.log("Login successful em teoria né carai kkkkkk")
        } catch (err) {
            console.error(err);
            toast.update(loadingToastId, {
                render: "",
                type:"success",
                isLoading: false,
                autoClose: 2000,
                closeOnClick: true,
            })
        }finally {
            setLoading(false)
        }
    };
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({resolver: yupResolver(schema)});
    const onSubmit = handleSubmit(async (data) => handlerLogin(data));


    return (
        <motion.div
            className="main-bg w-full min-h-screen flex justify-center"
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <main className="w-full min-h-screen px-5 flex items-center justify-center flex-col sm:max-w-2xl">
                <form onSubmit={onSubmit} className="w-full flex flex-col ">
                    <Input
                        label="E-mail:"
                        placeholder="exemple@email.com"
                        {...register("email", {required: true})}
                        id="email"
                        onChange={(event) => {
                            setValue('email', event.target.value);
                        }}
                    />
                    <p className="text-red-500">{errors.email?.message}</p>
                    <Input
                        label="Password:"
                        placeholder="***********"
                        {...register("password", {required: true})}
                        id="passoword"
                        onChange={(event) => {
                            setValue('password', event.target.value);
                        }}
                    />
                    <p className="text-red-500">{errors.password?.message}</p>

                    <Button type="submit" disabled={loading} >Login</Button>
                    {}
                </form>
            </main>
            <ToastContainer/>
        </motion.div>
    );
}
