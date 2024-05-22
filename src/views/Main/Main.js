import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import InformationComponent from '../../components/MainPageComponents/InformationComponent/InformationComponent';
import Button from '../../components/CommonComponents/Button/Button';
import Spacer from '../../components/CommonComponents/Spacer/Spacer';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <DefaultLayout>
        <div className="overflow-x-hidden">
          <div className="relative top-0 left-1/2 transform -translate-x-1/2 h-[500px] w-[150%] rounded-b-[100%] bg-white flex items-center justify-center flex-col">
            <div className="flex flex-row gap-2">
              <h1>Lorem ipsum dolor sit amet, </h1>
              <h1 className="text-amber-500 fade-in-text">consectetur</h1>
            </div>
            <Spacer height={'1rem'} />
            <span>Maecenas pulvinar condimentum massa. Curabitur et lorem </span>
            <Spacer height={'4rem'} />
            <div className="flex flex-row justify-center items-center">
              <Link className="no-underline" to={'/services'}>
                <Button width={'75px'} label={'Servicios'} />
              </Link>
              <span className="ml-6 font-semibold cursor-pointer">Mas Información</span>
            </div>
          </div>
        </div>
        <div className="-mt-20 w-full bg-stockifyPurple flex items-center justify-center">
          <InformationComponent />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Main;
