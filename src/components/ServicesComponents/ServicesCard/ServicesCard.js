import React from 'react';
import Button from '../../CommonComponents/Button/Button';

const testData = [
  {
    serviceName: 'prueba1',
    serviceImage: 'images/imagenprueba.jpg',
    servicePrice: 'free',
    serviceBenefits: ['beneficio1', 'beneficio2', 'beneficio3'],
  },
  {
    serviceName: 'prueba2',
    serviceImage: 'images/imagenprueba.jpg',
    servicePrice: '1111111',
    serviceBenefits: ['beneficio1', 'beneficio2', 'beneficio3'],
  },
  {
    serviceName: 'prueba3',
    serviceImage: 'images/imagenprueba.jpg',
    servicePrice: '10',
    serviceBenefits: ['beneficio1', 'beneficio2', 'beneficio3'],
  },
];

const ServicesCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-16 md:mt-32 lg:mt-48">
      {testData.map((service, index) => (
        <div
          key={index}
          className="relative flex flex-col border-4 border-dashed border-indigo-600 p-6 md:p-8 gap-8 bg-[#F1F3FF] text-center rounded-3xl w-full sm:w-1/2 md:w-1/3 lg:w-1/5 max-w-xs mx-auto">
          <div className="text-2xl md:text-3xl font-semibold">{service.serviceName}</div>
          <img className="w-36 h-36 mx-auto" alt="prueba" src={service.serviceImage} />
          <div className="text-xl md:text-2xl font-bold">{service.servicePrice}</div>
          <div className="flex flex-col gap-1">
            {service.serviceBenefits.map((benefit, index) => (
              <div key={index} className="text-sm md:text-base flex justify-start ml-12 gap-2 ">
                <img alt="check" src="icons/cheque.png" className='w-6 h-6' />
                {benefit}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button label="Pruebalo ya" />
          </div>
          <div
            className="absolute top-0 right-0 p-4 w-8 h-8 bg-stockifyLogoColor clip-path-triangle"
            style={{ borderTopRightRadius: '20px' }}>
            <img
              className="w-5 h-5 absolute top-0 right-0 p-2"
              src="icons/estrella.png"
              alt="estrella"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
