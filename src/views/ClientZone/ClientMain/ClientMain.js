import React from 'react';
import Sidebar from '../../../components/ClienZoneComponents/SideBar/Sidebar';
import AddInventory from '../../../components/ClienZoneComponents/AddInventory/AddInventory';
const ClientMain = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className='p-28'>
        <AddInventory />
      </div>
    </div>
  );
};

export default ClientMain;
