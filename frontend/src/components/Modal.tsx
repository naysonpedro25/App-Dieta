import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import Input from "./Input.tsx";
import {IoClose} from "react-icons/io5";
import Button from "./Button.tsx";
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from "react";

export default function Modal({title, onClose, label, mOnSubmit, tag}: {
    onClose: () => void,
    title: string,
    label: string,
    mOnSubmit: (calories: number) => Promise<void>,
    tag: "Add calories" | "remove calories",

}) {

    const schema = yup.object({
        updateCalories: yup.number().required(`${tag}`)
    });
    const [loading, setLoading] = useState<boolean>(false);
    type FormData = yup.InferType<typeof schema>;
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({resolver: yupResolver(schema)});


    const onSubmit = handleSubmit(async (data: FormData) => {
        setLoading(true);
        await mOnSubmit(data.updateCalories);
        setTimeout(() => {
            setLoading(false);
            onClose();
        }, 300)
    });

    return (
        <>
            {createPortal(
                <motion.div
                    id={"modal"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                    transition={{duration: 0.2}}

                    className="w-full h-screen fixed top-0 left-0 flex justify-center items-center"
                    style={{backgroundColor: "rgba(0,0,0,0.80)"}}
                >
                    <motion.div
                        initial={{scale: 0.8}}
                        animate={{scale: 1}}
                        exit={{scale: 0.8}}
                        transition={{duration: 0.2}}
                        className="bg-white w-10/12 p-10 rounded"
                    >
                        <form className={"relative"} onSubmit={onSubmit}>

                            <h2 className={"text-xl mb-3 w-full text-center font-bold"}>{title}</h2>
                            <Input label={label}
                                   textColorLabel="text-black"
                                   type={"number"}   {...register("updateCalories", {required: true})}
                                   id="updateCalories"
                                   onChange={(e) => {
                                       setValue('updateCalories', Number(e.target.value));
                                   }}/>
                            <p className="text-red-500">{errors.updateCalories?.message}</p>
                            <button className={"bg-red-600 rounded absolute hover:bg-red-800"}
                                    style={{top: -30, right: -30}} onClick={onClose}><IoClose color={"#fff"} size={30}/>
                            </button>

                            <Button className={"w-full"} type={"submit"}>
                                {loading ? <CircularProgress size={20} color="#fff"/> : 'Salvar'}
                            </Button>
                        </form>
                    </motion.div>
                </motion.div>,
                document.querySelector('.main-home') ?? document.body
            )}
        </>
    );
}

