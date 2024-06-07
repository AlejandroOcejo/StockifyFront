import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const [t] = useTranslation('global');

    return (
        <DefaultLayout>
            <div className="container mx-auto py-16 px-6 text-center mb-20">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-8">{t('AboutUs.Title')}</h1>
                <p className="text-xl leading-relaxed mb-12 text-gray-600">
                    {t('AboutUs.Description')}
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center transition-transform transform hover:scale-105">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">{t('AboutUs.Vision.Title')}</h2>
                        <p className="text-base leading-relaxed text-gray-600">
                            {t('AboutUs.Vision.Text')}
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center transition-transform transform hover:scale-105">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">{t('AboutUs.Project.Title')}</h2>
                        <p className="text-base leading-relaxed text-gray-600">
                            {t('AboutUs.Project.Text')}
                        </p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default AboutUs;
