import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useAuthStore } from './hooks/useAuthStore';
import { MainPage } from './pages/MainPage';

const AppRouter: React.FC = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if ( status === 'checking' ) {
    return <NotFound />;
  }

  return (
    <BrowserRouter>
      <Routes>
        { ( status === 'not-authenticated' ) ?
          <Route path="/" element={<Home />} /> :
          <Route path="/" element={<MainPage />} />
        }
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
