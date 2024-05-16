import React, { useEffect, useState } from 'react';
import '../../../index.css';
import Dialog from '../../CommonComponents/Dialog/Dialog';

const InformationComponent = () => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
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

  return (
    <>
      {isActive ? <Dialog closeDialog={handleClick} content={'b'} /> : null}
      <div className="flex flex-col items-center mt-32 mb-32 revealing-image">
        <h2 className="text-3xl font-semibold text-white mb-20">Nunc consectetur gravida</h2>
        <div className="flex items-center">
          <img
            onClick={handleClick}
            activeValue={isActive}
            className="w-60"
            src="/images/imagenprueba.jpg"
            alt="fernando alonso"
          />
          <div className="w-36 h-1 bg-white" />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-1.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-96 bg-white " />
        </div>
        <div className="flex items-center">
          <div className="w-96 bg-white " />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-2.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-36 h-1 bg-white" />
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
        </div>
        <div className="flex items-center">
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
          <div className="w-36 h-1 bg-white" />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-3.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-96 bg-white " />
        </div>
        <div className="flex items-center">
          <div className="w-96 bg-white " />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-4.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-36 h-1 bg-white" />
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
        </div>
      </div>
    </>
  );
};

export default InformationComponent;
