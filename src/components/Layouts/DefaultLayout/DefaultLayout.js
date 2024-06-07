import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import LangComponent from '../../CommonComponents/LangComponent/LangComponent';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <LangComponent />
      <Footer />
    </>
  );
};

export default DefaultLayout;
