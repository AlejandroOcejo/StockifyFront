import React from 'react';
import Button from '../../components/CommonComponents/Button/Button';

const Login = () => {
  return (
    <div className="w-screen h-screen bg-stockifyPurple flex flex-col justify-center items-center">
      <img className="h-16 absolute top-0 mt-6" src="/logo.png" alt="logo" />
      <h1 className="text-white text-5xl">Inicio de sesion</h1>
      <div className="flex flex-col items-center  bg-[#F1F3FF] p-16 rounded-2xl border-[#A0AFFF] border-solid">
        <input
          className="m-2 p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
          placeholder="Username"></input>
        <input
          className="m-2 p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
          placeholder="Password"
          type="password"></input>
        <span className="text-xs self-start pl-2 mb-4 text-gray-400 cursor-pointer">
          ¿Has olvidado tu contraseña?
        </span>
        <Button name={'Continuar'} />
      </div>
    </div>
  );
};

export default Login;
