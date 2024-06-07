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
    <div className="p-3 bg-stockifyPurple relative z-50">
      <div className="flex justify-between items-center text-white font-semibold max-w-screen-xl mx-auto">
        <Link className="no-underline" to={'/'}>
          <img className="h-16" src="/logo.png" alt="logo" />
        </Link>
        <div onClick={toggleMenu} className="lg:hidden ml-auto cursor-pointer">
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        <div
          className={`lg:flex flex-grow justify-center items-center lg:static absolute top-0 left-0 w-full lg:w-auto bg-stockifyPurple lg:bg-transparent ${menuOpen ? 'top-20' : 'top-[-490px]'} transition-all duration-1`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around w-full text-center lg:text-left">
            <div className="py-2 lg:py-0 lg:px-4">
              <Link className="no-underline" to={'/services'}>
                <span className="link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.Services')}
                </span>
              </Link>
            </div>
            <div className="py-2 lg:py-0 lg:px-4">
              <Link className="no-underline" to={'/tech'}>
                <span className="link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.Tech')}
                </span>
              </Link>
            </div>
            <div className="py-2 lg:py-0 lg:px-4">
              <Link className="no-underline" to={'/login'}>
                <span className="link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.ClientZone')}
                </span>
              </Link>
            </div>
            <div className="py-2 lg:py-0 lg:px-4">
              <Link className="no-underline" to={'/aboutus'}>
                <span className="link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
                  {t('header.About-Us')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
