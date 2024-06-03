import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../state/loginSlicer';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '../../components/CommonComponents/Switch/Switch';
import Spacer from '../../components/CommonComponents/Spacer/Spacer';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Button from '../../components/CommonComponents/Button/Button';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);
  const [isTenant, setIsTenant] = useState(false);
  const [bgClass, setBgClass] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isTenant,
  });

  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/client');
    }
  }, [user, navigate]);

  const handleToggle = () => {
    setBgClass(isTenant ? 'bg-change-to-purple' : 'bg-change-to-black');
    setIsTenant(!isTenant);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      isTenant,
    }));
  }, [isTenant]);

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-start items-center ${isTenant ? 'bg-black' : 'bg-stockifyPurple'} ${bgClass}`}
      onAnimationEnd={() => setBgClass('')}>
      <Link className="no-underline" to={'/'}>
        <img
          className="h-20 relative left-1/2 transform -translate-x-1/2 mt-6"
          src="/logo.png"
          alt="logo"
        />
      </Link>
      <Spacer height={'2rem'} />
      <h1 className="text-white text-5xl">Inicio de sesión</h1>
      <Spacer height={'2rem'} />
      <div
        className={`flex flex-col items-center bg-[#F1F3FF] pr-16 pl-16 pt-8 pb-8 rounded-2xl ${isTenant ? 'border-[#ffd082] border-solid' : 'border-[#A0AFFF] border-solid'}`}>
        <FloatLabel>
          <InputText
            id="username"
            value={formData.username}
            name="username"
            onChange={handleInputChange}
            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 ${isTenant ? 'border-[#fdeaca]' : 'border-[#A0AFFF]'}`}
          />
          <label htmlFor="username">Nombre de usuario</label>
        </FloatLabel>
        <Spacer height={'1.5rem'} /> 
        <FloatLabel>
          <InputText
            id="password"
            value={formData.password}
            name="password"
            type="password"
            onChange={handleInputChange}
            className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 ${isTenant ? 'border-[#fdeaca]' : 'border-[#A0AFFF]'}`}
          />
          <label htmlFor="password">Contraseña</label>
        </FloatLabel>
        <span className="text-xs self-start pl-2 mb-4 text-gray-400 cursor-pointer">
          ¿Has olvidado tu contraseña?
        </span>
        <div className="flex items-center space-x-3 mb-4">
          <label className="text-gray-700">¿Eres propietario?</label>
          <Switch isOn={isTenant} handleToggle={handleToggle} />
        </div>
        <Spacer height={'2rem'} />
        <Button onButtonClick={handleSubmit} label={'Continuar'} disabled={loading} />
        {error && <div className="text-red-500">{error}</div>}
        {user && <div className="text-green-500">¡Inicio de sesión exitoso!</div>}
      </div>
    </div>
  );
};

export default Login;
