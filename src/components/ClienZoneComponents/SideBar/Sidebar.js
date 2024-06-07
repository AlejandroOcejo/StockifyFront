import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation('global');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isTenant = localStorage.getItem('isTenant') === 'Tenant';

  return (
    <div className="flex md:flex-row">
      <header className="bg-stockifyPurple text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50 md:hidden">
        <button className='bg-transparent border-none' onClick={toggleSidebar}>
          <FaBars className="w-6 h-6 text-white" />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img className="w-20 h-auto" alt="logo" src="/logo.png" />
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-stockifyPurple text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:h-screen`}>
        <div className="w-64 h-full flex flex-col justify-between pt-16 md:pt-0">
          <div className="mt-6 flex flex-col gap-14">
            <div className={`flex justify-center items-center mb-6 ${isOpen ? 'md:flex hidden' : ''}`}>
              <img className="w-36 h-auto" alt="logo" src="/logo.png" />
            </div>
            <button className="md:hidden absolute top-4 right-4" onClick={toggleSidebar}>
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-start pl-6 space-y-8">
              <Link
                to="/client"
                className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover"
              >
                <img src="/inventario-disponible.png" alt="icon" className="w-8 h-8 mr-2" />
                {t('Sidebar.MyInventories')}
              </Link>
            </div>
            <div className="flex flex-col items-start pl-6 space-y-8">
              <Link
                to="/client/users"
                className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover"
              >
                <img src="/agregar-usuario.png" alt="icon" className="w-8 h-8 mr-2" />
                {t('Sidebar.Users')}
              </Link>
            </div>
            {isTenant && (
              <div className="flex flex-col items-start pl-6 space-y-8">
                <Link
                  to="/client/information"
                  className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover"
                >
                  <img src="/seguro.png" alt="icon" className="w-8 h-8 mr-2" />
                  {t('Sidebar.Information')}
                </Link>
              </div>
            )}
          </div>
          <div className="mb-6 pl-6">
            <a href='/login' onClick={handleLogoutClick} className="flex items-center no-underline text-white">
              <img src="/cerrar-sesion.png" alt="logout" className="w-8 h-8 mr-2" />
              {t('Sidebar.Logout')}
            </a>
          </div>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
