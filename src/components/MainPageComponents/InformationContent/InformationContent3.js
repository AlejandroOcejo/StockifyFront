import React from 'react';
import { useTranslation } from 'react-i18next';

const InformationContent3 = () => {
    const [t] = useTranslation('global');
    return (
        <div className="text-black p-1">
            <h3 className="text-2xl font-semibold mb-4">{t('InformationContent.Content3.Title')}</h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content3.Text1') }} />
            <div className="mb-4">
                <p className="inline" dangerouslySetInnerHTML={{ __html: t('InformationContent.Content3.Text2') }} />
                <img src="/agregar.png" alt="Gestión de Usuarios" className="w-32 h-32 ml-4 mb-2 float-right" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: t('InformationContent.Content3.Text3') }} />
        </div>
    );
};

export default InformationContent3;
