import {OrbitProgress} from "react-loading-indicators";
import {motion} from "framer-motion";
export default function LoadingOpacity() {
    return (
        <motion.div
            initial={{opacity: 0.3}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className={"absolute w-full flex  justify-center items-center h-screen z-20"} style={{backgroundColor: "rgba(0,0,0,0.80)"}}>
            <div className={"bg-white w-auto pb-3 pt-3 pl-10 pr-10 rounded"}><OrbitProgress/></div>
        </motion.div>
    );
}