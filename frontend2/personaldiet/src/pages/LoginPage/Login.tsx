import Input from "../../components/Input"; 
import Label from "../../components/Label";
import Button from "../../components/Button";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const loginInputsSchema = z.object({
  email: z.string({message: "coloque um email válido"}),
  password: z.string({required_error: "ifbiowboueboborubou"})

})

type LoginInputsSchema = z.infer<typeof loginInputsSchema>; // pega o tipo do objeto que eu passei no z.object 

export default function Login() {

  

  const { register, handleSubmit, formState: {errors} } = useForm<LoginInputsSchema>({resolver: zodResolver(loginInputsSchema)});
  async function handleLoginForm(data : LoginInputsSchema) {
    console.log(data); 

  } 
    return (
      <motion.div
        className="main-bg w-full min-h-screen flex justify-center px-10"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
      
        <form onSubmit={handleSubmit(handleLoginForm)}>
          <Label hmltFor="email"></Label>
          <Input hint="email" {...register("email")} id="email" />
          {/* agora só posso colocar no register o email e password, se tenta colocar outro n fun*/}
          {errors.email?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <Input hint="password" {...register("password")} id="password" />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          )}
          <Button type="submit">Login</Button>
        </form>
      </motion.div>
    );
}