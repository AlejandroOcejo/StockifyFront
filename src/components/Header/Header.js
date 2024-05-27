/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [t] = useTranslation('global');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-3 bg-stockifyPurple">
      <div className="flex justify-between items-center text-white font-semibold max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Link className="no-underline" to={'/'}>
            <img className="h-16" src="/logo.png" alt="logo" />
          </Link>
          <div onClick={toggleMenu} className="lg:hidden ml-auto">
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>
        <div
          className={`lg:flex flex-grow justify-center items-center ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
            <div className="flex-grow text-center">
              <Link className="no-underline" to={'/services'}>
                <a className="text-center link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.Services')}
                </a>
              </Link>
            </div>
            <div className="flex-grow text-center">
              <a
                href="#"
                className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                {t('header.Pricing')}
              </a>
            </div>
            <div className="flex-grow text-center">
              <a
                href="#"
                className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                {t('header.Tech')}
              </a>
            </div>
            <div className="flex-grow text-center">
              <Link className="no-underline" to={'/login'}>
                <a className="text-center link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.ClientZone')}
                </a>
              </Link>
            </div>
            <div className="flex-grow text-center">
              <a
                href="#"
                className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                {t('header.About-Us')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
