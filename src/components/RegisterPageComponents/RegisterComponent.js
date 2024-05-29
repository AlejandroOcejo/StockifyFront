import React, { useState } from 'react';
import Button from '../../components/CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkUser } from '../../state/registerSlicer';
import Dropdown from '../CommonComponents/Dropdown/Dropdown';
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
  const [selectedService, setSelectedService] = useState(servicesArray[0].name);
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

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    console.log(selectedService);
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
    <div className="w-screen h-screen bg-stockifyPurple flex flex-row justify-center items-center">
      <Link className="no-underline" to={'/'}>
        <img
          className="h-16 absolute top-6 left-1/2 transform -translate-x-1/2"
          href="/"
          src="/logo.png"
          alt="logo"
        />
      </Link>
      <TransitionGroup component={null}>
        <CSSTransition key={formStep} timeout={150} classNames="swipe">
          <div className="max-w-lg w-full h-2/4 bg-[#F1F3FF] p-12 rounded-2xl border-[#A0AFFF] border-solid flex flex-col justify-center">
            {formStep === 1 ? (
              <div className="w-full flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.username ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Nombre"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.surname ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Apellidos"
                    type="text"
                    name="surname"
                    value={formData.contact.surname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative flex items-center">
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.password ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Contraseña"
                    type={type}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span
                    className="absolute top-0 right-0 p-2.5 flex justify-around items-center"
                    onClick={handleToggle}>
                    <Icon
                      className="absolute mr-10"
                      icon={icon}
                      size={25}
                      style={{ marginTop: '15px' }}
                    />
                  </span>
                </div>
                <input
                  className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 ${
                    errors.email ? 'border-red-500' : 'border-[#A0AFFF]'
                  }`}
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                />
                <div className="flex flex-row space-x-4">
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.country ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="País"
                    name="country"
                    value={formData.contact.country}
                    onChange={handleInputChange}
                  />
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.city ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Ciudad"
                    type="text"
                    name="city"
                    value={formData.contact.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1 ${
                      errors.direction ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Dirección"
                    type="text"
                    name="direction"
                    value={formData.contact.direction}
                    onChange={handleInputChange}
                  />
                  <input
                    className={`p-2 rounded-xl border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-3 ${
                      errors.postalCode ? 'border-red-500' : 'border-[#A0AFFF]'
                    }`}
                    placeholder="Código Postal"
                    type="text"
                    name="postalCode"
                    value={formData.contact.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <Dropdown
                  selectedValue={selectedService}
                  options={servicesArray}
                  onChange={handleServiceChange}
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
                <input
                  className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                  placeholder="Nombre Completo"
                  type="name"
                  name="cardHolder"
                  value={paymentFormData.cardHolder}
                  onChange={handlePaymentInputChange}
                />
                <input
                  className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                  placeholder="Número de tarjeta"
                  type="tel"
                  name="cardNumber"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength="19"
                  required
                  value={paymentFormData.cardNumber}
                  onChange={handlePaymentInputChange}
                />
                <div className="flex space-x-4">
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                    style={{ maxWidth: '65px' }}
                    placeholder="MM/AAAA"
                    maxLength="7"
                    type="text"
                    name="expirationDate"
                    value={paymentFormData.expirationDate}
                    onChange={handlePaymentInputChange}
                  />
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                    style={{ maxWidth: '60px' }}
                    placeholder="CVC"
                    type="tel"
                    name="CVC"
                    pattern="[0-9]{3,4}"
                    autoComplete="cc-csc"
                    maxLength="4"
                    required
                    value={paymentFormData.CVC}
                    onChange={handlePaymentInputChange}
                  />
                </div>
                <Spacer />
                <div className="flex justify-center w-full">
                  <div className="w-full ">
                    <div className="bg-white p-4 rounded-lg bg-logoBlack bg-contain bg-no-repeat bg-center">
                      <h2 className="text-2xl font-bold mb-4 text-center ">Coste Total</h2>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Plan:</div>
                        <div>{getSelectedServicePrice(selectedService)?.name}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Precio:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService)?.price) ===
                          'number'
                            ? parsePrice(getSelectedServicePrice(selectedService)?.price) + '€'
                            : parsePrice(getSelectedServicePrice(selectedService)?.price)}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Impuestos:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService)?.price) ===
                          'number'
                            ? parsePrice(getSelectedServicePrice(selectedService)?.price) * 0.21 +
                              '€'
                            : 'No'}
                        </div>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <div>Total:</div>
                        <div>
                          {typeof parsePrice(getSelectedServicePrice(selectedService)?.price) ===
                          'number'
                            ? parsePrice(getSelectedServicePrice(selectedService)?.price) +
                              parsePrice(getSelectedServicePrice(selectedService)?.price) * 0.21 +
                              '€'
                            : getSelectedServicePrice(selectedService)?.price}
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
