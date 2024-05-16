import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import InformationComponent from '../../components/MainPageComponents/InformationComponent/InformationComponent';

const Main = () => {
  return (
    <div>
      <DefaultLayout>
        <div className="overflow-x-hidden">
          <div className="relative top-0 mt-[100px] left-1/2 transform -translate-x-1/2 h-[500px] w-[150%] rounded-b-[100%] bg-white"></div>
        </div>
        <div className="-mt-20 w-full bg-stockifyPurple flex items-center justify-center">
          <InformationComponent />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Main;
