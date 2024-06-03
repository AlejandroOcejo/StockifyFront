import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main/Main';
import Login from './views/Login/Login';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Register from './views/Register/Register';
import Services from './views/Services/Services';
import ClientMain from './views/ClientZone/ClientMain/ClientMain';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import global_es from './Translations/es/global.json';
import global_en from './Translations/en/global.json';
import global_fr from './Translations/fr/global.json';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import ClientCreateUser from './views/ClientZone/ClientCreateUser/ClientCreateUser';
import ClientProductsInfo from './views/ClientZone/ClienProductsInfo/ClientProductsInfo';
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
    fr: {
      global: global_fr,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/Client" element={<ClientMain />} />
      <Route path="/Client/users" element={<ClientCreateUser />} />
      <Route path="/Client/products" element={<ClientProductsInfo />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
