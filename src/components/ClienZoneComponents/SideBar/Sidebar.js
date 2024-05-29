import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-stockifyPurple text-white flex flex-col justify-between">
      <div className="mt-6">
        <div className="flex justify-center items-center mb-20">
          <img className="w-36 h-auto" alt="logo" src="logo.png" />
        </div>
        <div className="flex flex-col items-center space-y-8">
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
          <Link
            to="#"
            className="flex items-center text-center text-white text-2xl cursor-pointer no-underline link link-underline-black hover:link-underline-black-hover">
            <img src="icons/estrella.png" alt="icon" className="w-6 h-6 mr-2" />
            Mis inventarios
          </Link>
        </div>
      </div>
      <div className="mb-6">
        <a href="#" className="flex justify-center items-center no-underline text-white">
          <img src="logout-icon-url" alt="logout" className="w-6 h-6 mr-2" />
          Cerrar sesión
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
