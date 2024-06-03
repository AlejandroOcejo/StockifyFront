import React from 'react';
import Sidebar from '../../ClienZoneComponents/SideBar/Sidebar';

const ClientLayout = ({ children, centerContent = true }) => {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className={`flex-1 ${centerContent ? 'flex justify-center items-center' : ''}`}>
        {children}
      </div>
    </main>
  );
};

export default ClientLayout;
