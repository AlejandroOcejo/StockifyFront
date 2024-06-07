import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import InformationComponent from '../../components/MainPageComponents/InformationComponent/InformationComponent';
import Button from '../../components/CommonComponents/Button/Button';
import Spacer from '../../components/CommonComponents/Spacer/Spacer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Main.css';

const Main = () => {
  const [t] = useTranslation('global');

  const reviews = [
    { id: 1, content: t('Reviews.Review1'), author: 'Juan Pérez', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, content: t('Reviews.Review2'), author: 'Ana García', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, content: t('Reviews.Review3'), author: 'María Rodríguez', avatar: 'https://i.pravatar.cc/150?img=21' },
    { id: 4, content: t('Reviews.Review4'), author: 'Pedro Martínez', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, content: t('Reviews.Review5'), author: 'Lucía Fernández', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, content: t('Reviews.Review6'), author: 'Carlos Gómez', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, content: t('Reviews.Review7'), author: 'Laura Díaz', avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: 8, content: t('Reviews.Review8'), author: 'Sergio López', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, content: t('Reviews.Review9'), author: 'Marta Sánchez', avatar: 'https://i.pravatar.cc/150?img=9' },
  ];

  const reviewTemplate = (review) => {
    return (
      <div className="p-4 border-round bg-white shadow-md card-height">
        <div className="flex items-center mb-2">
          <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full mr-2" />
          <p><strong>{review.author}</strong></p>
        </div>
        <p>{review.content}</p>
      </div>
    );
  };

  return (
    <div>
      <DefaultLayout>
        <div className="overflow-x-hidden">
          <div className="relative top-0 left-1/2 transform -translate-x-1/2 h-[500px] w-[150%] rounded-b-[100%] bg-white flex items-center justify-center flex-col px-4 md:px-8 lg:px-16" style={{ padding: '110px' }}>
            <div className="flex flex-row gap-2">
              <h1 className='fade-in-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>{t('MainPage.Title')}</h1>
            </div>
            <Spacer height={'1rem'} />
            <span className='text-base sm:text-lg md:text-xl lg:text-2xl text-center'>{t('MainPage.SubTitle')}</span>
            <Spacer height={'4rem'} />
            <div className="flex flex-row justify-center items-center">
              <Link className="no-underline" to={'/services'}>
                <Button width={'7rem'} label={t('header.Services')} />
              </Link>
              <Link className="no-underline text-black" to={'/aboutus'}>
                <span className="ml-6 font-semibold cursor-pointer">{t('MainPage.Information')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="-mt-20 w-full bg-stockifyPurple flex flex-col items-center justify-center">
          <InformationComponent />
          <Spacer height={'8rem'} />
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-gray-100 py-8">
          <h2 className="text-2xl mb-4">{t('MainPage.ReviewsTitle')}</h2>
          <Carousel
            className='w-11/12 md:w-3/4 lg:w-1/2'
            value={reviews}
            itemTemplate={reviewTemplate}
            numVisible={3}
            numScroll={3}
            circular
            autoplayInterval={3000}
            responsiveOptions={[
              {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
              },
              {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
              },
              {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
              }
            ]}
          />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Main;
