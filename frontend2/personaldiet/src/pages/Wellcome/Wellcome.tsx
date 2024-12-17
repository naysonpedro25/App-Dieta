import Button from "../../components/Button";
import Logo from "./assets/logo_app.png";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
export default function Wellcome() {
  const nav = useNavigate();


  return (
    <motion.div
      className="main-bg w-full min-h-screen flex justify-center"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="w-full min-h-screen px-5 flex items-center justify-center flex-col sm:max-w-2xl">
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
        <div className="w-full flex flex-col gap-4">
          <Button
            onClick={() => {
              nav("/login");
            }}
          >
            Faça Login
          </Button>
          <Button onClick={() => console.log("ifwibfdifbi")}>
            Registre-se
          </Button>
        </div>
      </main>
    </motion.div>
  );
}
