import PrincipalHeader from "../components/PrincipalHeader.tsx";
import { useAuth } from "../context/auth.tsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import Button from "../components/Button.tsx";
import Modal from "../components/Modal";
import {updateCaloriesBurned, updateCaloriesConsumed} from "../services/UpdateCalories.ts";

export default function Home() {
  const auth = useAuth();
  const user = auth?.user;
  const [addCal, setAddCal] = useState<boolean>(false);
  const [removeCal, setremoveCal] = useState<boolean>(false);

  let porcent: number = ((user?.dailyCalories?.calories_consumed?? 1) / (user?.calories_goals?? 1)) * 100;

  return (
    <motion.div
      className=" main-bg w-full min-h-svh flex flex-col justify-center sm:flex-row"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PrincipalHeader nameUser={user?.name} />
      <main className="w-full px-3.5 flex-1 flex items-center flex-col sm:max-w-2xl">
        <section
          className="w-full min-h-12 rounded flex mt-3.5 flex-col justify-center items-center"
          style={{ backgroundColor: "#009AD6" }}
        >
          <h2
            className=" text-white font-bold mt-5 mb-5"
            style={{ fontSize: "1.4rem" }}
          >
            Meta Diária: {user?.calories_goals}
            <span className="ml-0.5 text-sm">kcal</span>
          </h2>
          <div className="flex w-full flex-wrap justify-between items-center">
            <p className="flex-1 text-center font-bold " style={{color: "#a2ff74"}}>
              Consumidas
              <br /> {auth?.user?.dailyCalories?.calories_consumed}
            </p>

            <div
              className="flex-1 text-center ml-3 mr-3 max-w-32 min-w-24 "
              style={{ width: 150, height: 150 }}
            >
              <CircularProgressbarWithChildren
                value={user?.dailyCalories?.calories_consumed?? 0}
                maxValue={user?.calories_goals}
                styles={buildStyles({
                  trailColor: "#006483",
                  pathColor: "#ffffff",
                })}
              >
                <p className={"text-white font-bold text-2xl"}>{porcent.toFixed(1)}%</p>
              </CircularProgressbarWithChildren>
            </div>
            <p className="flex-1 text-center font-bold text-red-400 ">
              Utilizadas
              <br /> {auth?.user?.dailyCalories?.calories_burned}
            </p>
          </div>
        </section>
        <div className={"w-full flex gap-1.5 "}>
          <Button
            className={"flex-1 bg-lime-500 mt-1.5 hover:bg-lime-600"}
            bg={true}
            onClick={() => {
              setAddCal(true);
            }}
          >
            Adicionar calorias
          </Button>
          <Button
            className={"flex-1 bg-red-600 mt-1.5 hover:bg-red-800"}
            bg={true}
            onClick={() => {
              setremoveCal(true);
            }}
          >
            Remover calorias
          </Button>
        </div>
      </main>
      <AnimatePresence>
        {addCal && (
          <Modal
            title={"Adicionar calorias"}
            tag="Add calories"
            label={"Adicione as calorias consumidas"}
            onClose={() => {
              setTimeout(() => setAddCal(false), 100);
            }}
            mOnSubmit={async (calories) => {
              try{
                await updateCaloriesConsumed(auth, {calories_consumed: calories});
                console.log("atualizando caloris_consumed")
              }catch (err){
                console.log("erro ao atualizar front: ", err)
              }
            }}
          />
        )}
        {removeCal && (
          <Modal
            title={"Remover calorias"}
            tag={"remove calories"}
            label={"Adicione as calorias queimadas"}
            onClose={() => {
              setTimeout(() => setremoveCal(false), 100);
            }}
            mOnSubmit={ async (calories) => {
              try{
                await updateCaloriesBurned(auth, {calories_burned: calories});
                console.log("atualizando calories_burned")
              }catch (err){
                console.log("erro ao atualizar front: ", err)
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
