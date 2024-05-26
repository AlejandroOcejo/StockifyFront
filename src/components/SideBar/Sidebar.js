import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-stockifyPurple bottom-0 top-0 fixed justify-between p-10">
      <div className="flex flex-col items-center">
        <img className="w-auto h-24" src="/logo.png" alt="logo" />
        <div className="flex flex-col space-y-10 mt-6">
          <div className="text-white text-4xl font-bold">Inventario 1</div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
          <div className="flex items-center text-white text-2xl">
            <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
            Prueba
          </div>
        </div>
      </div>
      <div className="text-white text-xl font-bold mt-6 flex items-center">
        <img className="w-6 h-6 mr-4" src="/icons/estrella.png" alt="estrella" />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
