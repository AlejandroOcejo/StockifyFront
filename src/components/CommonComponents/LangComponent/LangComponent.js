import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const flags = {
  es: '/flags/spain.svg',
  en: '/flags/uk.png',
  fr: '/flags/france.png',
};

const LangComponent = () => {
  const { i18n } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);
  const [currentFlag, setCurrentFlag] = useState(flags[i18n.language]);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('lang') || i18n.language);

  useEffect(() => {
    setCurrentFlag(flags[i18n.language]);
    localStorage.setItem('lang', i18n.language);
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    triggerGTMEvent(currentLang);
  }, [currentLang]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShowFlags(false);
  };

  const triggerGTMEvent = (lang) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'langEvent',
        selectedLang: lang,
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 cursor-pointer">
      <img
        id='langFlag'
        src={currentFlag}
        alt="Current Language"
        className="w-8 h-5 mb-1 border-2 border-solid rounded"
        onClick={() => setShowFlags(!showFlags)}
      />
      {showFlags && (
        <div className="flex flex-col">
          {Object.keys(flags).map(
            (lng) =>
              lng !== currentLang && (
                <img
                  key={lng}
                  src={flags[lng]}
                  alt={lng}
                  className="w-8 h-5 mb-2 border-2 border-solid rounded"
                  onClick={() => changeLanguage(lng)}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default LangComponent;
