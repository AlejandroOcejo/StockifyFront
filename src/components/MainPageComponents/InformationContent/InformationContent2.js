import React from 'react';
import { useTranslation } from 'react-i18next';

const InformationContent2 = () => {
    const [t] = useTranslation('global');
    return (
        <div className="text-black p-5">
            <h3 className="text-2xl font-semibold mb-4">{t('InformationContent.Content2.Title')}</h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content2.Text1') }} />
            <div className="mb-4">
                <p className="inline" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content2.Text2') }} />
            </div>
            <div className="mb-4">
                <img src="/exportar.png" alt="Gestión de Inventarios" className="w-32 h-32 mr-4 mb-2 float-left" />
                <p className="inline" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content2.Text3') }} />
            </div>
        </div>
    );
};

export default InformationContent2;
