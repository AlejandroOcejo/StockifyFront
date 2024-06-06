import { Dropdown } from 'primereact/dropdown';

import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Button from '../../components/CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkUser } from '../../state/registerSlicer';
import Spacer from '../CommonComponents/Spacer/Spacer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const servicesArray = [
    { name: 'prueba1', price: 'free' },
    { name: 'prueba2', price: '1000000' },
    { name: 'prueba3', price: '0.99' },
  ];
  const dispatch = useDispatch();
  const { loading, error: errorRegister } = useSelector((state) => state.register);
  const [formStep, setFormStep] = useState(1);
  const [selectedService, setSelectedService] = useState(servicesArray[0]);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contact: {
      surname: '',
      email: '',
      country: '',
      city: '',
      direction: '',
      postalCode: '',
    },
  });
  const [paymentFormData, setPaymentFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    CVC: '',
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    surname: false,
    email: false,
    country: false,
    city: false,
    direction: false,
    postalCode: false,
    userExists: false,
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name in prevFormData) {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else if (name in prevFormData.contact) {
        return {
          ...prevFormData,
          contact: {
            ...prevFormData.contact,
            [name]: value,
          },
        };
      }
      return prevFormData;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === '',
      userExists: false,
    }));
  };

  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === 'expirationDate' && value.length === 2 && !value.includes('/')) {
      updatedValue = value + '/';
    }

    if (name === 'cardNumber') {
      const digitsOnly = value.replace(/-/g, '');

      if ([4, 9, 14].includes(digitsOnly.length)) {
        updatedValue = digitsOnly.replace(/(.{4})/g, '$1-');
      }
    }

    setPaymentFormData({
      ...paymentFormData,
      [name]: updatedValue,
    });
  };

  const returnPrevStep = () => {
    setFormStep(1);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.value);
    console.log(e.value);
  };

  const validateForm = () => {
    const newErrors = {
      username: formData.username === '',
      password: formData.password === '',
      surname: formData.contact.surname === '',
      email: formData.contact.email === '',
      country: formData.contact.country === '',
      city: formData.contact.city === '',
      direction: formData.contact.direction === '',
      postalCode: formData.contact.postalCode === '',
      userExists: errors.userExists,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formattedData = {
        ...formData,
        contact: JSON.stringify(formData.contact),
      };
      const isRegistered = await dispatch(checkUser(formData)).unwrap();
      if (!isRegistered) {
        dispatch(registerUser(formattedData));
        setFormStep(2);
        if (formStep === 2 && !errorRegister) {
          navigate('/login');
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: true,
          userExists: true,
        }));
        setFormStep(1);
      }
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setFormStep(2);
    }
  };

  const getSelectedServicePrice = (serviceName) => {
    return servicesArray.find((element) => serviceName === element.name);
  };

  const parsePrice = (price) => {
    if (!price) return null;
    const numericPrice = price.replace(/[^\d.-]/g, '');
    return numericPrice === '' || isNaN(Number(numericPrice)) ? price : Number(numericPrice);
  };

  return (
    <div className="w-screen h-screen bg-stockifyPurple flex flex-col justify-start gap-8 items-center px-4 pb-8 overflow-hidden">
      <Link className="no-underline" to={'/'}>
        <img
          className="h-20 relative left-1/2 transform -translate-x-1/2 mt-6"
          href="/"
          src="/logo.png"
          alt="logo"
        />
      </Link>
      <Spacer height={'2rem'} />
      <TransitionGroup component={null}>
        <CSSTransition key={formStep} timeout={150} classNames="swipe">
          <div className="max-w-lg w-full bg-[#F1F3FF] p-8 md:p-12 rounded-2xl border-[#A0AFFF] border-solid flex flex-col justify-center">
            {formStep === 1 ? (
              <div className="w-full flex flex-col space-y-7">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                  <FloatLabel>
                    <InputText
                      id="username"
                      value={formData.username}
                      name="username"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.username ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="username">Nombre</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText
                      id="surname"
                      value={formData.contact.surname}
                      name="surname"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.surname ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="surname">Apellidos</label>
                  </FloatLabel>
                </div>
                <div >
                  <FloatLabel>
                    <InputText
                      id="password"
                      value={formData.password}
                      name="password"
                      type={type}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.password ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <span
                      className="absolute top-0 right-0 p-2.5 flex justify-around items-center cursor-pointer"
                      onClick={handleToggle}>
                      <Icon
                        className="absolute mr-8"
                        icon={icon}
                        size={25}
                        style={{ marginTop: '19px' }}
                      />
                    </span>
                  </FloatLabel>
                </div>
                <FloatLabel>
                  <InputText
                    id="email"
                    value={formData.contact.email}
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 ${errors.email ? 'border-red-500' : 'border-[#A0AFFF]'
                      }`}
                  />
                  <label htmlFor="email">Email</label>
                </FloatLabel>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <FloatLabel>
                    <InputText
                      id="country"
                      value={formData.contact.country}
                      name="country"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.country ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="country">País</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText
                      id="city"
                      value={formData.contact.city}
                      name="city"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.city ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="city">Ciudad</label>
                  </FloatLabel>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <FloatLabel>
                    <InputText
                      id="direction"
                      value={formData.contact.direction}
                      name="direction"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${errors.direction ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="direction">Dirección</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText
                      id="postalCode"
                      value={formData.contact.postalCode}
                      name="postalCode"
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-3 ${errors.postalCode ? 'border-red-500' : 'border-[#A0AFFF]'
                        }`}
                    />
                    <label htmlFor="postalCode">Código Postal</label>
                  </FloatLabel>
                </div>
                <Dropdown
                  value={selectedService}
                  onChange={handleServiceChange}
                  options={servicesArray}
                  optionLabel="name"
                  placeholder="Selecciona un Servicio"
                  className="w-full rounded-xl"
                />
                {Object.values(errors).some((error) => error) && (
                  <div className="text-red-500">
                    {errors.userExists
                      ? 'Usuario ya registrado'
                      : 'Rellene todos los campos antes de continuar'}
                  </div>
                )}
                <Spacer height={'7rem'} />
                <div className="flex justify-center">
                  <Button
                    width={'14rem'}
                    onButtonClick={nextStep}
                    label={'Continuar'}
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col space-y-4">
                <FloatLabel>
                  <InputText disabled
                    id="cardHolder"
                    value={paymentFormData.cardHolder}
                    name="cardHolder"
                    onChange={handlePaymentInputChange}
                    className="bg-slate-200 p-2 w-full rounded-xl border-gray-400 border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                  />
                  <label htmlFor="cardHolder">Nombre Completo</label>
                </FloatLabel>

                <div className="flex space-x-4">
                  <FloatLabel>
                    <InputText disabled
                      id="cardNumber"
                      value={paymentFormData.cardNumber}
                      name="cardNumber"
                      type="tel"
                      pattern="[0-9\s]{13,19}"
                      autoComplete="cc-number"
                      maxLength="19"
                      required
                      onChange={handlePaymentInputChange}
                      className="bg-slate-200 p-2 rounded-xl border-gray-400 border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                    />
                    <label htmlFor="cardNumber">Número de tarjeta</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText disabled
                      id="expirationDate"
                      value={paymentFormData.expirationDate}
                      name="expirationDate"
                      maxLength="7"
                      onChange={handlePaymentInputChange}
                      className="bg-slate-200 p-2 rounded-xl border-gray-400 border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                    />
                    <label htmlFor="expirationDate">MM/AAAA</label>
                  </FloatLabel>
                </div>
                <FloatLabel>
                  <InputText disabled
                    id="CVC"
                    value={paymentFormData.CVC}
                    name="CVC"
                    type="tel"
                    pattern="[0-9]{3,4}"
                    autoComplete="cc-csc"
                    maxLength="4"
                    required
                    onChange={handlePaymentInputChange}
                    className="bg-slate-200 p-2 rounded-xl border-gray-400 border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                  />
                  <label htmlFor="CVC">CVC</label>
                </FloatLabel>
                <Spacer />
                <div className="flex justify-center w-full">
                  <div className="w-full ">
                    <div className="bg-white p-4 rounded-lg bg-logoBlack bg-contain bg-no-repeat bg-center">
                      <h2 className="text-2xl font-bold mb-4 text-center ">Coste Total</h2>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Plan:</div>
                        <div>{getSelectedServicePrice(selectedService?.name)?.name}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Precio:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService?.name)?.price) ===
                            'number'
                            ? parsePrice(getSelectedServicePrice(selectedService?.name)?.price) + '€'
                            : parsePrice(getSelectedServicePrice(selectedService?.name)?.price)}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Impuestos:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService?.name)?.price) ===
                            'number'
                            ? parsePrice(getSelectedServicePrice(selectedService?.name)?.price) * 0.21 +
                            '€'
                            : 'No'}
                        </div>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <div>Total:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService?.name)?.price) ===
                            'number'
                            ? parsePrice(getSelectedServicePrice(selectedService?.name)?.price) +
                            parsePrice(getSelectedServicePrice(selectedService?.name)?.price) * 0.21 +
                            '€'
                            : getSelectedServicePrice(selectedService?.name)?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Spacer />
                <div className="flex justify-between">
                  <Button
                    width={'12rem'}
                    onButtonClick={returnPrevStep}
                    label={'Volver'}
                    disabled={loading}
                  />
                  <Button
                    width={'12rem'}
                    onButtonClick={handleSubmit}
                    label={'Aceptar y pagar'}
                    disabled={loading}
                  />
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RegisterComponent;
