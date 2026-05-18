import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import reportWebVitals from './reportWebVitals.ts';
import NavBar from './components/NavBar.tsx';
import HomePage from './HomePage/page.tsx';
import AboutUsPage from './AboutUs/page.tsx';
import FindUsPage from './FindUs/page.tsx';
import Footer from './components/footer.tsx';
import LoginPage from './LoginPage/page.tsx';
import AdminMenuPage from './AdminMenuPage/page.tsx';
import './css/footer.css';
import './css/brand-kit.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="first-stop-bagels.us.auth0.com"
      clientId="IYc1Tc8hwJPZaH0rqlaG8rIkUHx1fCOf"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/FindUs" element={<FindUsPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/AdminMenu" element={<AdminMenuPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
