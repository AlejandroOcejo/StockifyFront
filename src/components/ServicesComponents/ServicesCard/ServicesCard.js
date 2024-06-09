import React, { useState, useEffect } from 'react';
import Button from '../../CommonComponents/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const ServicesCard = () => {
  const [selectedService, setSelectedService] = useState('');
  const [t] = useTranslation('global');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedService) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'service_selected',
        selectedService: selectedService,
      });

      navigate('/register');
    }
  }, [selectedService, navigate]);

  const handleRedirect = (serviceName) => {
    setSelectedService(serviceName);
  };

  const testData = [
    {
      serviceName: t('Services.StandardPlan.Name'),
      serviceImage: '/paquete-de-pila.png',
      servicePrice: t('Services.StandardPlan.Price'),
      servicePriceYear: t('Services.StandardPlan.PriceYear'),
      serviceBenefits: t('Services.StandardPlan.Benefits', { returnObjects: true }),
    },
    {
      serviceName: t('Services.FreePlan.Name'),
      serviceImage: '/caja.png',
      servicePrice: t('Services.FreePlan.Price'),
      servicePriceYear: t('Services.FreePlan.PriceYear'),
      serviceBenefits: t('Services.FreePlan.Benefits', { returnObjects: true }),
    },
    {
      serviceName: t('Services.PremiumPlan.Name'),
      serviceImage: '/almacen.png',
      servicePrice: t('Services.PremiumPlan.Price'),
      servicePriceYear: t('Services.PremiumPlan.PriceYear'),
      serviceBenefits: t('Services.PremiumPlan.Benefits', { returnObjects: true }),
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-16 md:mt-32 lg:mt-32 mb-16 md:mb-32 lg:mb-32">
      {testData.map((service, index) => (
        <div
          key={index}
          className={`relative flex flex-col border-4 p-6 md:p-8 gap-8 text-center rounded-3xl w-full sm:w-1/2 md:w-1/3 lg:w-1/5 max-w-xs mx-auto ${service.serviceName === t('Services.FreePlan.Name') ? 'border-dashed border-amber-500' : 'border-dashed border-indigo-600'
            } bg-[#F1F3FF]`}>
          <div className="text-2xl md:text-3xl font-semibold">{service.serviceName}</div>
          <img className="w-36 h-36 mx-auto" alt="prueba" src={service.serviceImage} />
          <div className="text-xl md:text-2xl font-bold flex flex-col">{service.servicePrice}
            <span className='text-xs text-gray-800'>
              {service.servicePriceYear || 'N/A'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {service.serviceBenefits.map((benefit, index) => (
              <div key={index} className="text-sm md:text-base flex justify-start ml-6 gap-2">
                <img alt="check" src="icons/cheque.png" className="w-6 h-6" />
                {benefit}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button id={'serviceButton'} onButtonClick={() => handleRedirect(service.serviceName)} label={t('Services.ButtonLabel')} disabled={service.serviceName !== t('Services.FreePlan.Name')} />
          </div>
          {service.serviceName === t('Services.FreePlan.Name') && (
            <div
              className="absolute top-0 right-0 p-4 w-14 h-14 bg-stockifyLogoColor clip-path-triangle"
              style={{ borderTopRightRadius: '20px' }}>
              <img
                className="w-8 h-8 absolute top-0 right-0 p-2"
                src="icons/estrella.png"
                alt="estrella"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
