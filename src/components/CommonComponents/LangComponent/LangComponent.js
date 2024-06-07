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

  useEffect(() => {
    setCurrentFlag(flags[i18n.language]);
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowFlags(false);
  };

  return (
    <div className="fixed bottom-4 right-4 cursor-pointer">
      <img
        src={currentFlag}
        alt="Current Language"
        className="w-8 h-5 mb-1 border-2 border-solid rounded"
        onClick={() => setShowFlags(!showFlags)}
      />
      {showFlags && (
        <div className="flex flex-col">
          {Object.keys(flags).map(
            (lng) =>
              lng !== i18n.language && (
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
