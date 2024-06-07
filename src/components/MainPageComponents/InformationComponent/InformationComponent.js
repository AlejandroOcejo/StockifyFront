import React, { useEffect, useState } from 'react';
import '../../../index.css';
import Dialog from '../../CommonComponents/Dialog/Dialog';
import InformationContent1 from '../InformationContent/InformationContent1';
import InformationContent2 from '../InformationContent/InformationContent2';
import InformationContent3 from '../InformationContent/InformationContent3';
import { useTranslation } from 'react-i18next';

const InformationComponent = () => {
  const [isActive, setActive] = useState(false);
  const [activeContent, setActiveContent] = useState(1);
  const [t] = useTranslation('global');

  const handleClick = (num) => {
    setActive(true);
    setActiveContent(num);
  };

  useEffect(() => {
    const revealingImages = document.querySelectorAll('.revealing-image');
    revealingImages.forEach((image) => {
      let animationStarted = false;

      const revealAnimation = () => {
        if (!animationStarted) {
          animationStarted = true;
          const startTime = performance.now();
          const animationDuration = 3000;

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = (elapsedTime / animationDuration) * 100;
            console.log(`Animation progress: ${progress.toFixed(2)}%`);

            if (progress < 100) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);

          image.style.opacity = '1';
          image.style.clipPath = 'inset(0% 0% 0% 0%)';
        }
      };

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.0001,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            image.style.animation = 'reveal 3s both';
            image.style.animationTimingFunction = 'ease-in-out';
            revealAnimation();
          }
        });
      }, observerOptions);

      observer.observe(image);
      return () => observer.unobserve(image);
    });
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case 1:
        return <InformationContent1 />;
      case 2:
        return <InformationContent2 />;
      case 3:
        return <InformationContent3 />;
      default:
        return null;
    }
  };

  const imageData = [
    { num: 1, src: '/diferenciacion.png' },
    { num: 2, src: '/embalaje.png' },
    { num: 3, src: '/grupo.png' },
  ];

  return (
    <>
      {isActive && <Dialog closeDialog={() => setActive(false)} content={renderContent()} />}
      <div className="flex flex-col items-center mt-32 revealing-image">
        <h2 className="text-3xl font-semibold text-white mb-20">{t('MainPage.HowToStart')}</h2>
        {imageData.map(({ num, src }, index, array) => (
          <div key={num} className="flex flex-col items-center ">
            <img className="h-16 w-16 " src={`/icons/numbers/numero-${num}.png`} alt="logo" />
            <div className="w-1 h-32 bg-white " />
            <img
              onClick={() => handleClick(num)}
              activeValue={isActive}
              className="w-48 rounded-3xl border-white border-solid p-2 cursor-pointer"
              src={src}
              alt="imagen"
            />
            {index !== array.length - 1 && <div className="w-1 h-32 bg-white " />}
          </div>
        ))}
      </div>
    </>
  );
};

export default InformationComponent;
