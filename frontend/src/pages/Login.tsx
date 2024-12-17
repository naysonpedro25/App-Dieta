import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input.tsx'
import {useState} from "react";
import {loginUser} from "../services/LoginServer.ts";
import {useAuth} from "../context/auth.tsx";
import {Header} from "../components/Header.tsx";
import LoadingOpacity from "../components/LoadingOpacity.tsx";

const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
})

type FormData = yup.InferType<typeof schema>;
export default function Login() {


    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handlerLogin = async ({email, password}: FormData) => {
        setLoading(true);
        try {
            if (!auth) return;
            await loginUser(auth, {email, password});
            setInterval(()=>{}, 5000);
            navigate('/home');
            console.log("Login successful em teoria né carai kkkkkk")
        } catch (err) {
            console.error(err);
        } finally {
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
        className="main-bg w-full min-h-svh flex op flex-col justify-center sm:flex-row"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header textLogo="Entre na sua conta" />
        <motion.main
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="w-full  px-5 flex-1 flex items-center justify-center flex-col sm:max-w-2xl"
        >
          <form onSubmit={onSubmit} className="w-full flex flex-col ">
            <Input
              label="E-mail:"
              placeholder="exemple@email.com"
              {...register("email", { required: true })}
              id="email"
              textColorLabel="text-white"
              onChange={(event) => {
                setValue("email", event.target.value);
              }}
              
            />

            <p className="text-red-500">{errors.email?.message}</p>
            <Input
              label="Password:"
              placeholder="***********"
              {...register("password", { required: true })}
              id="passoword"
              textColorLabel="text-white"
              onChange={(event) => {
                setValue("password", event.target.value);
              }}
            />
            <p className="text-red-500">{errors.password?.message}</p>

            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </form>
        </motion.main>
        {loading && <LoadingOpacity />}
      </motion.div>
    );
}
