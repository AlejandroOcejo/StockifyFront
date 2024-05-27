import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import InformationComponent from '../../components/MainPageComponents/InformationComponent/InformationComponent';
import Button from '../../components/CommonComponents/Button/Button';
import Spacer from '../../components/CommonComponents/Spacer/Spacer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangComponent from '../../components/CommonComponents/LangComponent/LangComponent';

const Main = () => {
  const [t] = useTranslation('global');

  return (
    <div>
      <DefaultLayout>
        <div className="overflow-x-hidden">
          <div className="relative top-0 left-1/2 transform -translate-x-1/2 h-[500px] w-[150%] rounded-b-[100%] bg-white flex items-center justify-center flex-col">
            <div className="flex flex-row gap-2">
              <h1>{t('MainPage.Title')}</h1>
              <h1 className="text-amber-500 fade-in-text">{t('MainPage.Title2')}</h1>
            </div>
            <Spacer height={'1rem'} />
            <span>{t('MainPage.SubTitle')}</span>
            <Spacer height={'4rem'} />
            <div className="flex flex-row justify-center items-center">
              <Link className="no-underline" to={'/services'}>
                <Button width={'75px'} label={'Servicios'} />
              </Link>
              <span className="ml-6 font-semibold cursor-pointer">{t('MainPage.Information')}</span>
            </div>
          </div>
        </div>
        <div className="-mt-20 w-full bg-stockifyPurple flex items-center justify-center">
          <InformationComponent />
        </div>
        <LangComponent />
      </DefaultLayout>
    </div>
  );
};

export default Main;
