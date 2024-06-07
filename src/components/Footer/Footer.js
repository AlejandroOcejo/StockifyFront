import '../../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-stockifyPurple p-6">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Link to={'/'}>
            <img className="h-16" src="/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <img className="h-12" src="/instagram.png" alt="App 1" />
          <img className="h-12" src="/linkedin.png" alt="App 2" />
          <img className="h-12" src="/youtube.png" alt="App 3" />
        </div>
      </div>
      <div className="border-t border-white border-solid mt-4 mb-2"></div>
    </div>
  );
};

export default Footer;
