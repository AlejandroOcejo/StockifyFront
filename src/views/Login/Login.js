import React, { useState, useEffect } from 'react';
import Button from '../../components/CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../state/loginSlicer';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '../../components/CommonComponents/Switch/Switch';
import Spacer from '../../components/CommonComponents/Spacer/Spacer';

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
      className={`w-screen h-screen flex flex-col justify-center items-center ${isTenant ? 'bg-black' : 'bg-stockifyPurple'} ${bgClass}`}
      onAnimationEnd={() => setBgClass('')}>
      <Link className="no-underline" to={'/'}>
        <img
          className="h-16 absolute top-6 left-1/2 transform -translate-x-1/2"
          src="/logo.png"
          alt="logo"
        />
      </Link>
      <h1 className="text-white text-5xl">Inicio de sesión</h1>
      <div
        className={`flex flex-col items-center bg-[#F1F3FF] pr-16 pl-16 pt-8 pb-8 rounded-2xl ${isTenant ? 'border-[#ffd082] border-solid' : 'border-[#A0AFFF] border-solid'}`}>
        <input
          className={`m-2 p-2 rounded-xl  ${isTenant ? 'border-[#fdeaca] border-solid focus:border-teal outline-stockifyLogoColor focus:ring-0' : 'border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0'}`}
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          className={`m-2 p-2 rounded-xl  ${isTenant ? 'border-[#fdeaca] border-solid focus:border-teal outline-stockifyLogoColor focus:ring-0' : 'border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0'}`}
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
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
