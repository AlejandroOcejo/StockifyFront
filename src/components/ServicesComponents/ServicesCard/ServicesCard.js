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
    <div className="flex flex-row items-center justify-center gap-10 mt-64">
      {testData.map((service, index) => (
        <div
          key={index}
          className="relative flex flex-col border-3 border-dashed border-indigo-600 px-10 py-5 bg-[#F1F3FF] text-center gap-4 rounded-3xl">
          <div className="text-2xl font-semibold">{service.serviceName}</div>
          <img className="w-36 h-36" alt="prueba" src={`${service.serviceImage}`} />
          <div className="text-xl font-bold">{service.servicePrice}</div>
          <div className="flex flex-col">
            {service.serviceBenefits.map((benefit, index) => (
              <div key={index} className="mr-2">
                {benefit}
              </div>
            ))}
          </div>
          <Button label={'Pruebalo ya'} />
          <div
            className="absolute top-0 right-0 p-5 w-8 h-8 bg-stockifyLogoColor clip-path-triangle"
            style={{ borderTopRightRadius: '20px' }}>
            <img
              className="w-5 h-5 absolute top-0 right-0 p-3"
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
