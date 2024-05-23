import React, { useState } from 'react';
import Button from '../../components/CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../state/loginSlicer';
import { Link } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="w-screen h-screen bg-stockifyPurple flex flex-col justify-center items-center">
      <Link className="no-underline" to={'/'}>
        <img
          className="h-16 absolute top-6 left-1/2 transform -translate-x-1/2"
          href="/"
          src="/logo.png"
          alt="logo"
        />
      </Link>
      <h1 className="text-white text-5xl">Inicio de sesion</h1>
      <div className="flex flex-col items-center  bg-[#F1F3FF] p-16 rounded-2xl border-[#A0AFFF] border-solid">
        <input
          className="m-2 p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          className="m-2 p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <span className="text-xs self-start pl-2 mb-4 text-gray-400 cursor-pointer">
          ¿Has olvidado tu contraseña?
        </span>
        <Button onButtonClick={handleSubmit} label={'Continuar'} disabled={loading} />
        {error && <div className="text-red-500">{error}</div>}
        {user && <div className="text-green-500">Login successful!</div>}
      </div>
    </div>
  );
};

export default Login;
