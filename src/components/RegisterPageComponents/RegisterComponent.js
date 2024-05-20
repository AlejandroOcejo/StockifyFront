import React, { useState } from 'react';
import Button from '../../components/CommonComponents/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../state/registerSlicer';
import Dropdown from '../CommonComponents/Dropdown/Dropdown';
import Spacer from '../CommonComponents/Spacer/Spacer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const RegisterComponent = () => {
  const servicesArray = [
    { name: 'prueba1', price: 'free' },
    { name: 'prueba2', price: '1000000' },
    { name: 'prueba3', price: '0.99' },
  ];
  const [formStep, setFormStep] = useState(1);
  const [selectedService, setSelectedService] = useState(servicesArray[0].name);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    password: '',
    email: '',
    country: '',
    city: '',
    direction: '',
    postalCode: '',
  });

  const [paymentFormData, setpaymentFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    CVC: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    setpaymentFormData({
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData));
    setFormStep(2);
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
      <img className="h-16 absolute top-0 mt-6" src="/logo.png" alt="logo" />
      <TransitionGroup component={null}>
        <CSSTransition key={formStep} timeout={150} classNames="swipe">
          <div className="max-w-lg w-full h-2/4 bg-[#F1F3FF] p-12 rounded-2xl border-[#A0AFFF] border-solid flex flex-col justify-center">
            {formStep === 1 ? (
              <div className="w-full flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1"
                    placeholder="Nombre"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1"
                    placeholder="Apellidos"
                    type="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="flex flex-row space-x-4">
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1"
                    placeholder="País"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1"
                    placeholder="Ciudad"
                    type="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-1"
                    placeholder="Dirección"
                    type="direction"
                    name="direction"
                    value={formData.direction}
                    onChange={handleInputChange}
                  />
                  <input
                    className="p-2 rounded-xl border-[#A0AFFF] border-solid focus:border-teal outline-stockifyPurple focus:ring-0 flex-3"
                    placeholder="Código Postal"
                    type="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <Dropdown
                  selectedValue={selectedService}
                  options={servicesArray}
                  onChange={handleServiceChange}
                />
                <Spacer height={'11rem'} />
                <div className="flex justify-center">
                  <Button
                    width={'14rem'}
                    onButtonClick={handleSubmit}
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
                  <div className="w-full md:w-2/3 lg:w-1/2">
                    <div className="bg-white p-4 rounded-lg">
                      <h2 className="text-2xl font-bold mb-4 text-center">Coste Total</h2>
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
