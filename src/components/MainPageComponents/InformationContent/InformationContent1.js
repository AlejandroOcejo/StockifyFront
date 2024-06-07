import React from 'react';
import { useTranslation } from 'react-i18next';

const InformationContent1 = () => {
    const [t] = useTranslation('global');
    return (
        <div className="text-black p-1">
            <h3 className="text-2xl font-semibold mb-4">{t('InformationContent.Content1.Title')}</h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content1.Text1') }} />
            <div className="mb-4">
                <img src="/inventario.png" alt="Gestión de Inventarios" className="w-32 h-32 ml-4 mb-2 float-right" />
                <p className="inline" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content1.Text2') }} />
            </div>
        </div>
    );
};

export default InformationContent1;
