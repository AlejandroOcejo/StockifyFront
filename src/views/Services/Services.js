import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout/DefaultLayout';
import ServicesCard from '../../components/ServicesComponents/ServicesCard/ServicesCard';
const Main = () => {
  return (
    <div>
      <DefaultLayout>
        <ServicesCard></ServicesCard>
      </DefaultLayout>
    </div>
  );
};

export default Main;
