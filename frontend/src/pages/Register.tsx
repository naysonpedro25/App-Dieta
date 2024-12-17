import {motion} from "framer-motion";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
// import {ToastContainer} from "react-toastify";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {Header} from "../components/Header.tsx";
import {useState} from "react";
import Selection from "../components/Selection.tsx";
import LoadingOpacity from "../components/LoadingOpacity.tsx";
import {useAuth} from "../context/auth.tsx";
import {registerUser} from "../services/RegisterServer.ts";
import {useNavigate} from "react-router-dom";


const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    height : yup.number().required('Height is required'),
    weight: yup.number().required('Weight is required'),
    age: yup.number().required('Age is required'),
    sex : yup.string().required("Sex is required"),
    calories_goals: yup.number().required("Calories goal is required"),
    objective : yup.string().required('Objective is required'),
})

type FormData = yup.InferType<typeof schema>;
export default function Register() {
    const [stepForms, setStepForms] = useState<number>(1);
    const nextStep = () => setStepForms(stepForms + 1);
    // const backStep = () => setStepForms(stepForms - 1);
    const auth = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},

    } = useForm<FormData>({resolver: yupResolver(schema)});
    const onSubmit = handleSubmit(async (data) =>{
        setLoading(true);
        try {
            if (!auth) return;
            await registerUser(auth,data);
            setInterval(()=>{}, 5000);
            navigate('/home');
            console.log("Login successful em teoria né carai kkkkkk")
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    });



    return (
        <motion.div
            className="main-bg w-full min-h-screen flex flex-col justify-center sm:flex-row"
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >

            {stepForms >= 2 ? <Header textLogo="Vamos começar" monClick={()=>{setStepForms(stepForms -1)}} /> : <Header textLogo="Vamos começar" /> }


            <motion.main
                key={stepForms}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="w-full  px-5 flex-1 flex items-center justify-center relative flex-col sm:max-w-2xl">
                <div className="flex flex-col w-full justify-self-start absolute top-0">
                    <h2 className="flex-1 text-start items-center flex text-xl ml-4 mt-4 text-white">Step {stepForms}</h2>
                </div>
                <h1 className={"text-2xl text-white font-bold mb-6"}>
                    {stepForms == 1 && "Adicione suas credenciais"}
                    {stepForms == 2 && "Adicione suas estatísticas físicas"}
                    {stepForms == 3 && "Adicione seus objetivos"}
                </h1>
                <form onSubmit={onSubmit} className="w-full flex  flex-col ">

                    {stepForms === 1 && (
                        <>

                            <Input
                                label="Nome"
                                placeholder="Pedro"
                                textColorLabel="text-black"
                                {...register("name", {required: true})}
                                id="name"
                                onChange={(event) => {
                                    setValue('name', event.target.value);
                                }}
                            />
                            <p className="text-red-500">{errors.email?.message}</p>
                            <Input
                                textColorLabel={"text-black"}
                                label="E-mail"
                                placeholder="exemple@email.com"
                                {...register("email", {required: true})}
                                id="email"
                                onChange={(event) => {
                                    setValue('email', event.target.value);
                                }}
                            />
                            <p className="text-red-500">{errors.password?.message}</p>
                            <Input
                                textColorLabel={"text-black"}
                                label="Senha:"
                                placeholder="***********"
                                {...register("password", {required: true})}
                                id="passoword"
                                onChange={(event) => {
                                    setValue('password', event.target.value);
                                }}
                            />
                            <p className="text-red-500">{errors.password?.message}</p>

                        </>
                    )
                    }{stepForms === 2 && (
                    <>
                        <Input
                            label="Seu Peso atual"
                            placeholder="ex: 70"
                            {...register("weight", {required: true})}
                            id="weight"
                            type='number'
                            onChange={(event) => {
                                setValue('weight', Number(event.target.value));
                            }}
                        />
                        <p className="text-red-500">{errors.weight?.message}</p>
                        <Input
                            label="Sua altura em centrímentos"
                            placeholder="ex : 170"
                            type='number'
                            {...register("height", {required: true})}
                            id="height"
                            onChange={(event) => {
                                setValue('height', Number(event.target.value));
                            }}
                        />
                        <p className="text-red-500">{errors.height?.message}</p>
                        <Input
                            label="Sua Idade"
                            placeholder="ex: 18"
                            type='number'
                            {...register("age", {required: true})}
                            id="age"
                            onChange={(event) => {
                                setValue('age', Number(event.target.value));
                            }}
                        />
                        <p className="text-red-500">{errors.age?.message}</p>
                        <Selection
                            {...register("sex", {required: true})}
                            id={"sex"} label={"Selecione seu sexo"}
                            options={[{key: "MALE", value: "Masculino"}, {key: "FEMALE", value: "Feminino"}]}/>
                    </>
                )
                }{stepForms === 3 && (
                    <>


                        <Selection
                            {...register("objective", {required: true})}
                            id={"objective"} label={"Selecione seu objetivo"}
                            options={[{key: "MAINTAIN", value: "Manter peso"},
                                {key: "WEIGHT_LOSS", value: "Perder peso"}, {
                                    key: "WEIGHT_GAIN",
                                    value: "Ganhar peso"
                                }]}/>
                        <Input
                            label="Digite a quantidade de calorias diárias"
                            placeholder="ex : 2200"
                            type='number'
                            {...register("calories_goals", {required: true})}
                            id="calories_goals"
                            onChange={(event) => {
                                setValue('calories_goals', Number(event.target.value));
                            }}
                        />

                    </>
                )
                }


                    {stepForms == 3 && <Button type="submit" disabled={loading}>Register</Button>}
                    {stepForms < 3 && <Button onClick={() => nextStep()}>Next</Button>}

                </form>
            </motion.main>
            {loading && <LoadingOpacity/>}

        </motion.div>
    )
        ;
}
