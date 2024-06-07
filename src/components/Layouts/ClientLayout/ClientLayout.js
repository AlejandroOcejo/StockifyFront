import React from 'react';
import Sidebar from '../../ClienZoneComponents/SideBar/Sidebar';

const ClientLayout = ({ children, centerContent = true }) => {
  return (
    <main className="md:flex md:flex-row">
      <Sidebar />
      <div className={`bg-[#E4E4E4] flex-1 mt-14 md:mt-0 ${centerContent ? 'flex justify-center items-center' : ''}`}>
        {children}
      </div>
    </main>
  );
};

export default ClientLayout;
