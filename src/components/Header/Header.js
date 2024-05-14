/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../index.css';

const Header = () => {
  return (
    <div className="p-3 bg-stockifyPurple">
      <div className="flex justify-center items-center text-white font-semibold">
        <div className="flex justify-between items-center max-w-screen-xl w-full">
          <div className="flex-grow flex justify-center items-center">
            <img className="h-16" src="/logo.png" alt="logo" />
          </div>
          <div className="flex-grow text-center">
            <a
              href="#"
              className="text-center link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
              Servicios
            </a>
          </div>
          <div className="flex-grow text-center">
            <a
              href="#"
              className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
              Precios
            </a>
          </div>
          <div className="flex-grow text-center">
            <a
              href="#"
              className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
              Tecnologías
            </a>
          </div>
          <div className="flex-grow text-center">
            <a
              href="#"
              className=" flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
              Area cliente
            </a>
          </div>
          <div className="flex-grow text-center">
            <a
              href="#"
              className="text-center flex-grow link link-underline-black hover:link-underline-black-hover no-underline text-white p-1">
              Quienes somos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
