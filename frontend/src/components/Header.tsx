import {IoIosArrowBack} from 'react-icons/io'
import Logo from './assets/logo_app.png'
import {useNavigate} from "react-router-dom";
import React from 'react'

export function Header({monClick = null, textLogo}: { textLogo :string,step?: number ,monClick?: React.MouseEventHandler<HTMLButtonElement> | null }) {
    const nav = useNavigate();
    return (
        <header className="w-full bg-white flex flex-1 pt-1.5 pb-1.5 sm:min-h-svh rounded-b-2xl  max-h-24 rounded-none items-center">
            <button
                className='ml-3 mt-3  items-center absolute flex top-1 transition-colors duration-500 hover hover:bg-gray-200 p-2 rounded-lg'
                onClick={monClick ? monClick : ()=>{nav(-1)}}>
                <IoIosArrowBack size={25} color="#0f232c"/>
                <p className="font-bold ml-2 text-sm" style={{color: "#0f232c"}}>Voltar</p>
            </button>
            <div className=' flex flex-1 justify-center items-end text-center sm:flex-col-reverse sm:items-center '>
                <h2 className=" text-center font-extrabold text-2xl flex-1 sm:text-3xl">
                    {textLogo}
                </h2>
                <img className=' inline-block max-w-14 mr-2 flex-grow-0 sm:max-w-32' src={Logo} alt=""/>

            </div>
        </header>
    );
}
