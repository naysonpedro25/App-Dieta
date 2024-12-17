import {motion} from "framer-motion";

export default function PageError() {
    return (
        <motion.div
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="bg-red-500 h-screen w-full flex justify-center items-center">
            <h1 className="text-3xl text-white font-bold">Pagina de error</h1>
        </motion.div>
    );
}
