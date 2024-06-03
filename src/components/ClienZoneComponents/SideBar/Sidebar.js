import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex md:flex-row">
      {/* Header with menu button and logo for mobile */}
      <header className="bg-stockifyPurple text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50 md:hidden">
        <button onClick={toggleSidebar}>
          <FaBars className="w-6 h-6" />
        </button>
        <img className="w-36 h-auto" alt="logo" src="/logo.png" />
        <div></div> {/* Placeholder to balance the header */}
      </header>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-40 bg-stockifyPurple text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:h-screen`}>
        <div className="w-64 h-full flex flex-col justify-between pt-16 md:pt-0">
          <div className="mt-6">
            <div className="flex justify-center items-center mb-6">
              <img className="w-36 h-auto" alt="logo" src="/logo.png" />
            </div>
            <button className="md:hidden absolute top-4 right-4" onClick={toggleSidebar}>
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-start pl-6 space-y-8">
              <Link
                to="#"
                className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover"
              >
                <img src="/icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
                Mis inventarios
              </Link>
              {/* Repeat for other links */}
            </div>
          </div>
          <div className="mb-6 pl-6">
            <a href='/login' onClick={handleLogoutClick} className="flex items-center no-underline text-white">
              <img src="logout-icon-url" alt="logout" className="w-6 h-6 mr-2" />
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>

      {/* Overlay to close the sidebar when clicking outside */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
