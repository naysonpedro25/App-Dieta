
import Button from "./Button.tsx";
import { FaAppleAlt } from "react-icons/fa";



export default function PrincipalHeader({nameUser}: {nameUser?: string}) {
    // const nav = useNavigate();

    return (
        <header
            className="w-full bg-white flex flex-1 rounded-b-lg pt-1.5 pb-1.5 sm:min-h-svh max-h-24 sm:flex-wrap rounded-none items-center">

            <div
                className='ml-3.5 flex flex-1 justify-end flex-col sm:flex-col sm:items-start'>
                <h1 className="flex-1 font-bold text-xl sm:text-3xl ">
                    Minha dieta
                </h1>
                <p className='text-sm font-light sm:font-normal'>Usuário: {nameUser}</p>
            </div>
            <Button className={'w-auto text-sm mr-3.5 flex justify-center items-center gap-1.5'}>
                Alimentos <FaAppleAlt size={20} />
            </Button>
        </header>
    );
}
