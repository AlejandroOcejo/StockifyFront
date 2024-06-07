import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import { useTranslation } from 'react-i18next';

const Tech = () => {
    const [t] = useTranslation('global');

    const technologies = [
        { name: t('Tech.Technologies..NET.Name'), description: t('Tech.Technologies..NET.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg', url: 'https://dotnet.microsoft.com/' },
        { name: t('Tech.Technologies.React.Name'), description: t('Tech.Technologies.React.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', url: 'https://reactjs.org/' },
        { name: t('Tech.Technologies.JWT.Name'), description: t('Tech.Technologies.JWT.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg', url: 'https://jwt.io/' },
        { name: t('Tech.Technologies.Tailwind CSS.Name'), description: t('Tech.Technologies.Tailwind CSS.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg', url: 'https://tailwindcss.com/' },
        { name: t('Tech.Technologies.EmailJs.Name'), description: t('Tech.Technologies.EmailJs.Description'), imgSrc: 'https://www.emailjs.com/logo.png', url: 'https://www.emailjs.com/' },
        { name: t('Tech.Technologies.ChartJs.Name'), description: t('Tech.Technologies.ChartJs.Description'), imgSrc: 'https://asset.brandfetch.io/idFdo8ulhr/idzj34qGQm.png', url: 'https://www.chartjs.org/' },
        { name: t('Tech.Technologies.Docker.Name'), description: t('Tech.Technologies.Docker.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/docker.svg', url: 'https://www.docker.com/' },
        { name: t('Tech.Technologies.AWS.Name'), description: t('Tech.Technologies.AWS.Description'), imgSrc: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', url: 'https://aws.amazon.com/' },
        { name: t('Tech.Technologies.Kubernetes.Name'), description: t('Tech.Technologies.Kubernetes.Description'), imgSrc: 'https://www.ovhcloud.com/sites/default/files/styles/text_media_horizontal/public/2021-04/K8S-logo.png', url: 'https://kubernetes.io/' },
        { name: t('Tech.Technologies.Redux.Name'), description: t('Tech.Technologies.Redux.Description'), imgSrc: 'https://www.bairesdev.com/wp-content/uploads/2020/07/redux.svg', url: 'https://react-redux.js.org/' },
        { name: t('Tech.Technologies.GitHub.Name'), description: t('Tech.Technologies.GitHub.Description'), imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png', url: 'https://github.com/' },
        { name: t('Tech.Technologies.i18n.Name'), description: t('Tech.Technologies.i18n.Description'), imgSrc: 'https://rich-iannone.github.io/i18n/logo.svg', url: 'https://www.i18next.com/' }
    ];

    return (
        <DefaultLayout>
            <div className="container mx-auto py-16 px-6 text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-8">{t('Tech.Title')}</h1>
                <p className="text-xl leading-relaxed mb-12 text-gray-600">
                    {t('Tech.Description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {technologies.map((tech) => (
                        <a key={tech.name} href={tech.url} target="_blank" rel="noopener noreferrer" className="block bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 no-underline hover:no-underline">
                            <img src={tech.imgSrc} alt={`${tech.name} logo`} className="w-16 h-16 mx-auto mb-4" />
                            <h2 className="text-3xl font-semibold mb-4 text-gray-800">{tech.name}</h2>
                            <p className="text-base leading-relaxed text-gray-600">{tech.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Tech;
